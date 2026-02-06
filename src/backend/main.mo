import Array "mo:core/Array";
import Set "mo:core/Set";
import Text "mo:core/Text";
import List "mo:core/List";
import Order "mo:core/Order";
import Map "mo:core/Map";
import Nat32 "mo:core/Nat32";
import Int "mo:core/Int";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // ----- Types -----
  type JobId = Nat32;
  type ContactId = Nat32;

  public type JobCategory = {
    #delivery;
    #telecaller;
    #fieldExec;
    #warehouse;
    #backOffice;
    #other : Text;
  };

  public type Job = {
    id : JobId;
    title : Text;
    company : Text;
    city : Text;
    category : JobCategory;
    description : Text;
    salary : ?Text;
    jobType : ?Text;
  };

  public type ContactRequest = {
    id : ContactId;
    name : Text;
    mobileNumber : Text;
    city : Text;
    message : Text;
  };

  public type UserProfile = {
    name : Text;
  };

  module Job {
    public func compareById(j1 : Job, j2 : Job) : Order.Order {
      Nat32.compare(j1.id, j2.id);
    };

    public func compareByTitle(j1 : Job, j2 : Job) : Order.Order {
      Text.compare(j1.title, j2.title);
    };
  };

  // ----- State -----
  let jobs = Map.empty<JobId, Job>();
  let activeJobIds = Set.empty<JobId>();

  let contactRequests = Map.empty<ContactId, ContactRequest>();

  let userProfiles = Map.empty<Principal, UserProfile>();

  var nextJobId : JobId = 1;
  var nextContactId : ContactId = 1;

  // Initialize the authorization module
  let accessControlState = AccessControl.initState();

  // Include authorization functions in this actor
  include MixinAuthorization(accessControlState);

  // ----- User Profile Management -----
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // ----- Job Management (Admin) -----
  public shared ({ caller }) func addJob(
    title : Text,
    company : Text,
    city : Text,
    category : JobCategory,
    description : Text,
    salary : ?Text,
    jobType : ?Text,
  ) : async JobId {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    let jobId = nextJobId;
    nextJobId += 1;

    let newJob : Job = {
      id = jobId;
      title;
      company;
      city;
      category;
      description;
      salary;
      jobType;
    };

    jobs.add(jobId, newJob);
    activeJobIds.add(jobId);

    jobId;
  };

  public shared ({ caller }) func updateJob(
    jobId : JobId,
    title : Text,
    company : Text,
    city : Text,
    category : JobCategory,
    description : Text,
    salary : ?Text,
    jobType : ?Text,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    let existingJob = switch (jobs.get(jobId)) {
      case (?job) { job };
      case (null) { Runtime.trap("Job not found") };
    };

    let updatedJob : Job = {
      id = jobId;
      title;
      company;
      city;
      category;
      description;
      salary;
      jobType;
    };

    jobs.add(jobId, updatedJob);
  };

  public shared ({ caller }) func deactivateJob(jobId : JobId) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    if (not jobs.containsKey(jobId)) {
      Runtime.trap("Job not found");
    };
    activeJobIds.remove(jobId);
  };

  public shared ({ caller }) func activateJob(jobId : JobId) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    if (not jobs.containsKey(jobId)) {
      Runtime.trap("Job not found");
    };
    activeJobIds.add(jobId);
  };

  // ----- Job Query Functions (Public) -----
  public query func getAllActiveJobs() : async [Job] {
    let activeJobs = List.empty<Job>();
    for (jobId in activeJobIds.values()) {
      switch (jobs.get(jobId)) {
        case (?job) { activeJobs.add(job) };
        case (null) {};
      };
    };
    activeJobs.toArray();
  };

  public query func getJobById(jobId : JobId) : async ?Job {
    jobs.get(jobId);
  };

  public query func getJobsByCity(city : Text) : async [Job] {
    let filteredJobs = jobs.values().toArray().filter(func(job) { job.city == city });
    filteredJobs;
  };

  public query func getJobsByCategory(category : JobCategory) : async [Job] {
    let filteredJobs = jobs.values().toArray().filter(
      func(job) {
        switch (job.category, category) {
          case (#other(cat1), #other(cat2)) { cat1 == cat2 };
          case (cat1, cat2) { cat1 == cat2 };
        };
      }
    );
    filteredJobs;
  };

  public query func searchJobsByKeyword(keyword : Text) : async [Job] {
    let lowerKeyword = keyword.toLower();
    let filteredJobs = jobs.values().toArray().filter(
      func(job) {
        job.title.toLower().contains(#text lowerKeyword) or
        job.company.toLower().contains(#text lowerKeyword) or
        job.city.toLower().contains(#text lowerKeyword) or
        job.description.toLower().contains(#text lowerKeyword);
      }
    );
    filteredJobs;
  };

  // ----- Contact Form Submission -----
  public shared func submitContact(
    name : Text,
    mobileNumber : Text,
    city : Text,
    message : Text,
  ) : async ContactId {
    let contactId = nextContactId;
    nextContactId += 1;

    let newContact : ContactRequest = {
      id = contactId;
      name;
      mobileNumber;
      city;
      message;
    };

    contactRequests.add(contactId, newContact);
    contactId;
  };

  // ----- Admin Functions (Contact Requests) -----
  public query ({ caller }) func getAllContactRequests() : async [ContactRequest] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    contactRequests.values().toArray();
  };

  // ----- Example Seed Data -----
  public shared ({ caller }) func seedExampleJobs() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    let _ = await addJob(
      "Delivery Executive",
      "XYZ Logistics",
      "Delhi",
      #delivery,
      "Deliver packages to customers. Must have a bike.",
      ?"₹15,000–₹20,000",
      ?"Full-time",
    );

    let _ = await addJob(
      "Telecaller",
      "ABC Tele Services",
      "Mumbai",
      #telecaller,
      "Make outbound calls to potential customers. Good communication skills required.",
      ?"₹12,000–₹18,000",
      ?"Full-time",
    );

    let _ = await addJob(
      "Warehouse Assistant",
      "Warehouse Inc.",
      "Bangalore",
      #warehouse,
      "Assist in warehouse operations and inventory management.",
      ?"₹14,000–₹17,000",
      ?"Shift",
    );
  };
};
