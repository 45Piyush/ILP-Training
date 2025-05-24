// Service data

const services = {
  ac: {
    name: "AC & Appliances Repair",
    subs: ["AC Repair", "TV Repair", "Fridge Repair", "Washing Machine Repair"],
    vendors: ["CoolTech Services", "Appliance Masters", "HomeFix Experts"],
    amounts: ["₹1200", "₹800", "₹1500", "₹1000"],
  },
  cleaning: {
    name: "House Cleaning",
    subs: ["Full Home", "Kitchen", "Bathroom", "Windows"],
    vendors: ["CleanPro", "Sparkle Homes", "Shine & Polish"],
    amounts: ["₹2000", "₹800", "₹600", "₹500"],
  },
  vehicle: {
    name: "Vehicle Repair",
    subs: ["2-Wheeler", "3-Wheeler", "4-Wheeler", "Heavy Vehicle"],
    vendors: ["AutoCare", "QuickFix Garage", "MotoExperts"],
    amounts: ["₹500", "₹800", "₹1200", "₹2500"],
  },
  pickup: {
    name: "Product Pickup & Drop",
    subs: ["Furniture", "Electronics", "Vehicles", "Others"],
    vendors: ["QuickCourier", "SafeTransit", "Door2Door"],
    amounts: ["₹300", "₹250", "₹500", "₹400"],
  },
};

// DOM Elements
const modal = document.getElementById("serviceModal");
const closeModal = document.getElementById("closeModal");
const serviceCards = document.querySelectorAll(".service-card");
const modalTitle = document.getElementById("modal-title");
const subServicesContainer = document.getElementById("sub-services");
const vendorSelect = document.getElementById("service-vendor");
const serviceAmount = document.getElementById("service-amount");
const confirmBtn = document.getElementById("confirm-booking");
const bookingSuccess = document.getElementById("booking-success");
const serviceForm = document.getElementById("service-form");
const bookingId = document.getElementById("booking-id");
const bookingVendor = document.getElementById("booking-vendor");
const bookingDate = document.getElementById("booking-date");
const bookingService = document.getElementById("booking-service");
const newBookingBtn = document.getElementById("new-booking");
const serviceDate = document.getElementById("service-date");
const serviceAddress = document.getElementById("service-address");

let currentService = null;
let selectedSubService = null;

// Set minimum date to today
const today = new Date().toISOString().split("T")[0];
serviceDate.setAttribute("min", today);

// Open modal when service card is clicked
serviceCards.forEach((card) => {
  card.addEventListener("click", () => {
    const serviceType = card.getAttribute("data-service");
    currentService = services[serviceType];
    modalTitle.textContent = currentService.name;

    // Load sub-services
    subServicesContainer.innerHTML = "";
    currentService.subs.forEach((sub, index) => {
      const subEl = document.createElement("div");
      subEl.className = "sub-service";
      subEl.textContent = sub;
      subEl.addEventListener("click", () => {
        document
          .querySelectorAll(".sub-service")
          .forEach((el) => el.classList.remove("active"));
        subEl.classList.add("active");
        selectedSubService = sub;
        serviceAmount.value = currentService.amounts[index];
      });
      subServicesContainer.appendChild(subEl);
    });

    // Load vendors
    vendorSelect.innerHTML = '<option value="">Select Vendor</option>';
    currentService.vendors.forEach((vendor) => {
      const option = document.createElement("option");
      option.value = vendor;
      option.textContent = vendor;
      vendorSelect.appendChild(option);
    });

    // Reset form
    serviceForm.style.display = "block";
    bookingSuccess.style.display = "none";
    serviceAmount.value = "";
    serviceDate.value = "";
    serviceAddress.value = "";
    document
      .querySelectorAll(".sub-service")
      .forEach((el) => el.classList.remove("active"));
    vendorSelect.selectedIndex = 0;

    // Show modal
    modal.classList.add("active");
  });
});

// Close modal
closeModal.addEventListener("click", () => {
  modal.classList.remove("active");
});

// Confirm booking
confirmBtn.addEventListener("click", () => {
  if (!selectedSubService) {
    alert("Please select a sub-service");
    return;
  }

  if (!serviceDate.value) {
    alert("Please select a date");
    return;
  }

  if (!serviceAddress.value) {
    alert("Please enter your address");
    return;
  }

  if (!vendorSelect.value) {
    alert("Please select a vendor");
    return;
  }

  // Generate random booking ID
  const randomId = "BOOK" + Math.floor(10000 + Math.random() * 90000);

  // Display success message
  bookingId.textContent = randomId;
  bookingVendor.textContent = vendorSelect.value;
  bookingDate.textContent = serviceDate.value;
  bookingService.textContent = selectedSubService;

  serviceForm.style.display = "none";
  bookingSuccess.style.display = "block";
});

// New booking
newBookingBtn.addEventListener("click", () => {
  serviceForm.style.display = "block";
  bookingSuccess.style.display = "none";

  // Reset form
  serviceAmount.value = "";
  serviceDate.value = "";
  serviceAddress.value = "";
  document
    .querySelectorAll(".sub-service")
    .forEach((el) => el.classList.remove("active"));
  vendorSelect.selectedIndex = 0;
  selectedSubService = null;
});

// Close modal when clicking outside
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});
