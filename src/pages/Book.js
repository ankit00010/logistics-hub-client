import React, { useContext, useState } from "react";
import axios from "axios";
import { message } from "antd";
import "../CSS/BookingForm.css";
import "../CSS/Commonback.css";
import { PulseLoader } from "react-spinners";
import InputField from "../Components/Input";
import { AuthContext } from "../context/auth_context";

const BookingForm = () => {
  const { logout } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    // Client Information
    clientName: "",
    clientOrganization: "",
    clientContactNumber: "",
    clientEmail: "",

    // Receiver Information
    receiverName: "",
    receiverOrganization: "",
    receiverContactNumber: "",
    receiverEmail: "",

    // Shipment Details
    shipmentVehicleType: "",
    shipmentWeight: "",
    shipmentHsnCode: "",
    shipmentProductDescription: "",

    // Pickup Information
    pickupDate: "",
    pickupTime: "",
    pickupAddress: "",

    // Delivery Information
    deliveryDate: "",
    deliveryTime: "",
    deliveryAddress: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    clientName: "",
    clientOrganization: "",
    clientContactNumber: "",
    clientEmail: "",

    receiverName: "",
    receiverOrganization: "",
    receiverContactNumber: "",
    receiverEmail: "",

    shipmentVehicleType: "",
    shipmentWeight: "",
    shipmentHsnCode: "",
    shipmentProductDescription: "",

    pickupDate: "",
    pickupTime: "",
    pickupAddress: "",

    deliveryDate: "",
    deliveryTime: "",
    deliveryAddress: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const validatePhone = (phoneNumber) => {
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(phoneNumber);
  };

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));

    // Clear the error as soon as user starts typing
    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Started Checking");

    const errors = { ...fieldErrors }; // Maintain structure
    let hasErrors = false; // To track if there are any errors found

    // --- Client Information Validation ---
    if (!formData.clientName.trim()) {
      errors.clientName = "Client Name is required";
      hasErrors = true;
    } else errors.clientName = "";

    if (!formData.clientOrganization.trim()) {
      errors.clientOrganization = "Organization Name is required";
      hasErrors = true;
    } else errors.clientOrganization = "";

    if (!/^\S+@\S+\.\S+$/.test(formData.clientEmail)) {
      errors.clientEmail = "Client Email is invalid";
      hasErrors = true;
    } else errors.clientEmail = "";

    if (!validatePhone(formData.clientContactNumber)) {
      errors.clientContactNumber = "Client Contact Number is invalid";
      hasErrors = true;
    } else errors.clientContactNumber = "";

    // --- Receiver Information Validation ---
    if (!formData.receiverName.trim()) {
      errors.receiverName = "Receiver Name is required";
      hasErrors = true;
    } else errors.receiverName = "";

    if (!formData.receiverOrganization.trim()) {
      errors.receiverOrganization = "Organization Name is required";
      hasErrors = true;
    } else errors.receiverOrganization = "";

    if (!/^\S+@\S+\.\S+$/.test(formData.receiverEmail)) {
      errors.receiverEmail = "Receiver Email is invalid";
      hasErrors = true;
    } else errors.receiverEmail = "";

    if (!validatePhone(formData.receiverContactNumber)) {
      errors.receiverContactNumber = "Receiver Contact Number is invalid";
      hasErrors = true;
    } else errors.receiverContactNumber = "";

    // --- Shipment Details Validation ---
    if (!formData.shipmentVehicleType.trim()) {
      errors.shipmentVehicleType = "Vehicle Type is required";
      hasErrors = true;
    } else errors.shipmentVehicleType = "";

    if (!formData.shipmentWeight.trim()) {
      errors.shipmentWeight = "Weight is required";
      hasErrors = true;
    } else errors.shipmentWeight = "";

    if (!formData.shipmentHsnCode.trim()) {
      errors.shipmentHsnCode = "HSN Code is required";
      hasErrors = true;
    } else errors.shipmentHsnCode = "";

    if (!formData.shipmentProductDescription.trim()) {
      errors.shipmentProductDescription = "Product Description is required";
      hasErrors = true;
    } else errors.shipmentProductDescription = "";

    // --- Pickup Information Validation ---
    if (!formData.pickupDate.trim()) {
      errors.pickupDate = "Pickup Date is required";
      hasErrors = true;
    } else errors.pickupDate = "";

    if (!formData.pickupTime.trim()) {
      errors.pickupTime = "Pickup Time is required";
      hasErrors = true;
    } else errors.pickupTime = "";

    if (!formData.pickupAddress.trim()) {
      errors.pickupAddress = "Pickup Address is required";
      hasErrors = true;
    } else errors.pickupAddress = "";

    // --- Delivery Information Validation ---
    if (!formData.deliveryDate.trim()) {
      errors.deliveryDate = "Delivery Date is required";
      hasErrors = true;
    } else errors.deliveryDate = "";

    if (!formData.deliveryTime.trim()) {
      errors.deliveryTime = "Delivery Time is required";
      hasErrors = true;
    } else errors.deliveryTime = "";

    if (!formData.deliveryAddress.trim()) {
      errors.deliveryAddress = "Delivery Address is required";
      hasErrors = true;
    } else errors.deliveryAddress = "";

    // --- Set Errors to State ---
    setFieldErrors(errors);

    // --- If there are errors, stop submission ---
    if (hasErrors) {
      message.error("Please correct the highlighted errors!");
      return;
    }

    // --- If no errors, proceed to submit ---
    try {
      setIsLoading(true);

      const response = await axios.post(
        "http://localhost:8080/api/v1/users/book-form",
        formData
      );

      if (response.status === 200) {
        message.success(
          "Your form is submitted successfully. You will be contacted soon"
        );

        // --- Reset form fields ---
        setFormData({
          clientName: "",
          clientOrganization: "",
          clientContactNumber: "",
          clientEmail: "",

          receiverName: "",
          receiverOrganization: "",
          receiverContactNumber: "",
          receiverEmail: "",

          shipmentVehicleType: "",
          shipmentWeight: "",
          shipmentHsnCode: "",
          shipmentProductDescription: "",

          pickupDate: "",
          pickupTime: "",
          pickupAddress: "",

          deliveryDate: "",
          deliveryTime: "",
          deliveryAddress: "",
        });

        setFieldErrors({}); // Clear any errors
      }
    } catch (error) {
      message.error(
        "An error occurred while submitting the form. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  //   const renderError = (fieldName) => {
  //     return (
  //       fieldErrors[fieldName] && (
  //         <div className="error-message">{fieldErrors[fieldName]}</div>
  //       )
  //     );
  //   };

  return (
    <div className="about-us-container">
      <div className="transparent-backgrounds"></div>
      <div className="about-us-background">
        <div className="about-us-content">
          <h1>Book now</h1>
          <form className="custom-form">
            {/* Client Information */}
            <h3>Client Information</h3>
            <InputField
              title="Name"
              type="text"
              placeholder="Enter your name"
              value={formData.clientName}
              onChange={(val) => handleChange("clientName", val)}
              error={fieldErrors.clientName}
            />
            <InputField
              title="Organization"
              type="text"
              placeholder="Enter your organization"
              value={formData.clientOrganization}
              onChange={(val) => handleChange("clientOrganization", val)}
              error={fieldErrors.clientOrganization}
            />
            <InputField
              title="Contact Number"
              type="text"
              placeholder="Enter contact number"
              value={formData.clientContactNumber}
              onChange={(val) => handleChange("clientContactNumber", val)}
              error={fieldErrors.clientContactNumber}
            />
            <InputField
              title="Email"
              type="email"
              placeholder="Enter email"
              value={formData.clientEmail}
              onChange={(val) => handleChange("clientEmail", val)}
              error={fieldErrors.clientEmail}
            />

            {/* Receiver Information */}
            <h3>Receiver Information</h3>
            <InputField
              title="Name"
              type="text"
              placeholder="Enter receiver name"
              value={formData.receiverName}
              onChange={(val) => handleChange("receiverName", val)}
              error={fieldErrors.receiverName}
            />
            <InputField
              title="Organization"
              type="text"
              placeholder="Enter receiver organization"
              value={formData.receiverOrganization}
              onChange={(val) => handleChange("receiverOrganization", val)}
              error={fieldErrors.receiverOrganization}
            />
            <InputField
              title="Contact Number"
              type="text"
              placeholder="Enter receiver contact number"
              value={formData.receiverContactNumber}
              onChange={(val) => handleChange("receiverContactNumber", val)}
              error={fieldErrors.receiverContactNumber}
            />
            <InputField
              title="Email"
              type="email"
              placeholder="Enter receiver email"
              value={formData.receiverEmail}
              onChange={(val) => handleChange("receiverEmail", val)}
              error={fieldErrors.receiverEmail}
            />

            {/* Shipment Details */}
            <h3>Shipment Details</h3>
            <InputField
              title="Vehicle Type"
              type="text"
              placeholder="Enter vehicle type"
              value={formData.shipmentVehicleType}
              onChange={(val) => handleChange("shipmentVehicleType", val)}
              error={fieldErrors.shipmentVehicleType}
            />
            <InputField
              title="Weight"
              type="text"
              placeholder="Enter weight"
              value={formData.shipmentWeight}
              onChange={(val) => handleChange("shipmentWeight", val)}
              error={fieldErrors.shipmentWeight}
            />
            <InputField
              title="HSN Code"
              type="text"
              placeholder="Enter HSN code"
              value={formData.shipmentHsnCode}
              onChange={(val) => handleChange("shipmentHsnCode", val)}
              error={fieldErrors.shipmentHsnCode}
            />
            <InputField
              placeholder="Enter product description"
              value={formData.shipmentProductDescription}
              onChange={(val) =>
                handleChange("shipmentProductDescription", val)
              }
              isTextArea={true}
              rows={4}
              error={fieldErrors.shipmentProductDescription}
            />

            {/* Pickup Information */}
            <h3>Pickup Information</h3>
            <InputField
              title="Pickup Date"
              type="date"
              value={formData.pickupDate}
              onChange={(val) => handleChange("pickupDate", val)}
              error={fieldErrors.pickupDate}
            />
            <InputField
              title="Pickup Time"
              type="time"
              value={formData.pickupTime}
              onChange={(val) => handleChange("pickupTime", val)}
              error={fieldErrors.pickupTime}
            />
            <InputField
              placeholder="Enter pickup address"
              value={formData.pickupAddress}
              onChange={(val) => handleChange("pickupAddress", val)}
              isTextArea={true}
              rows={4}
              error={fieldErrors.pickupAddress}
            />

            {/* Delivery Information */}
            <h3>Delivery Information</h3>
            <InputField
              title="Delivery Date"
              type="date"
              value={formData.deliveryDate}
              onChange={(val) => handleChange("deliveryDate", val)}
              error={fieldErrors.deliveryDate}
            />
            <InputField
              title="Delivery Time"
              type="time"
              value={formData.deliveryTime}
              onChange={(val) => handleChange("deliveryTime", val)}
              error={fieldErrors.deliveryTime}
            />
            <InputField
              placeholder="Enter delivery address"
              value={formData.deliveryAddress}
              onChange={(val) => handleChange("deliveryAddress", val)}
              isTextArea={true}
              rows={4}
              error={fieldErrors.deliveryAddress}
            />

            {/* Submit Button */}
            {isLoading ? (
              <PulseLoader loading={isLoading} size={22} color="#CF6301" />
            ) : (
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-primary"
              >
                Submit
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
