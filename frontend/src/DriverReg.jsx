// V-3 ==================================================

import React, { useState } from 'react';
import './DriverReg.css';

function DriverReg() {
  const [drivingExperience, setDrivingExperience] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    address: '',
    drivingLicenseNumber: '',
    userNic: '',
    gender: '',
    language: '',
    townsNearYou: ['', ''],
    vehicleClasses: [], 
    hasDrivingExperience: false,
    yearsOfExperience: ''
  });
  
  
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case 'mobileNumber':
        return /^07\d{8}$/.test(value) || 'Invalid Mobile Number. Must start with "07" and have 10 digits.';
      case 'drivingLicenseNumber':
        return /^B\d{7}$/.test(value) || 'Invalid Driving License Number. Must start with "G" or "B" and have 07 digits.';
      case 'userNic':
        return /^(\d{9}[VXvx]|\d{12})$/.test(value) || 'Invalid NIC. Must be 9 digits followed by V/X or 12 digits.';
      default:
        return true;
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type !== 'checkbox') {
      const validationMessage = validateField(name, value);
      if (validationMessage !== true) {
        setErrors({ ...errors, [name]: validationMessage });
      } else {
        setErrors({ ...errors, [name]: '' });
      }
    }

    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        vehicleClasses: checked
          ? [...prevData.vehicleClasses, value]
          : prevData.vehicleClasses.filter((vehicleClass) => vehicleClass !== value),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleDrivingExperience = (value) => {
    setDrivingExperience(value);
    setFormData({
      ...formData,
      hasDrivingExperience: value,
      yearsOfExperience: value ? formData.yearsOfExperience : '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const validationErrors = {};
    Object.keys(formData).forEach((key) => {
      const validationResult = validateField(key, formData[key]);
      if (validationResult !== true) {
        validationErrors[key] = validationResult;
      }
    });
  
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:5000/api/drivers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            mobileNumber: formData.mobileNumber,
            address: formData.address,
            drivingLicenseNumber: formData.drivingLicenseNumber,
            userNic: formData.userNic,
            gender: formData.gender,
            language: formData.language,
            townsNearYou: formData.townsNearYou,
            vehicleClasses: formData.vehicleClasses,
            hasDrivingExperience: formData.hasDrivingExperience,
            yearsOfExperience: formData.yearsOfExperience,
          }),
        });
  
        if (response.ok) {
          const result = await response.json();
          alert(result.message);
        } else {
          alert('Failed to register driver. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while submitting the form.');
      }
    } else {
      setErrors(validationErrors);
    }
  };
  
  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="section person-photo">
          <label>Clear Photo of Person</label>
          <div className=" photo-actions">
            <input type='file' required />
          </div>
        </div>

        <div className="section personal-info">
          <div className="row">
            <label>First Name:
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </label>
            <label>Last Name:
              <input
                type="text"
                name="lastName" 
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="row">
            <label>Email:
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
            <label>Mobile Number:
              <input
                type="text"
                name="mobileNumber"
                placeholder="Mobile Number"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
              />
              {errors.mobileNumber && <span className="error">{errors.mobileNumber}</span>}
            </label>
          </div>

          <div className="row">
            <label>Address:
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="row">
            <label>Driving License Number:
              <input
                type="text"
                name="drivingLicenseNumber"
                placeholder="Driving License Number"
                value={formData.drivingLicenseNumber}
                onChange={handleChange}
                required
              />
              {errors.drivingLicenseNumber && <span className="error">{errors.drivingLicenseNumber}</span>}
            </label>
          </div>

          <div className="row">
            <label>NIC:
              <input
                type="text"
                name="userNic"
                placeholder="NIC"
                value={formData.userNic}
                onChange={handleChange}
                required
              />
              {errors.userNic && <span className="error">{errors.userNic}</span>}
            </label>
          </div>

          <div className="row">
            <label>Gender:
              <select name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>

          <div className="row">
            <label>Language:
              <input
                type="text"
                name="language"
                placeholder="Language"
                value={formData.language}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="row">
            <label>Towns Near You:
              <input
                type="text"
                name="townsNearYou"
                placeholder="Town 1"
                value={formData.townsNearYou[0]}
                onChange={(e) => {
                  const newTowns = [...formData.townsNearYou];
                  newTowns[0] = e.target.value;
                  setFormData({ ...formData, townsNearYou: newTowns });
                }}
              />
              <input
                type="text"
                name="townsNearYou"
                placeholder="Town 2"
                value={formData.townsNearYou[1]}
                onChange={(e) => {
                  const newTowns = [...formData.townsNearYou];
                  newTowns[1] = e.target.value;
                  setFormData({ ...formData, townsNearYou: newTowns });
                }}
              />
            </label>
          </div>

          <div className='license-photo'>
            <label>Photo of Driving License</label>
            <label>Front Side Photo:
              <input
                type="file"
                required
              />  
            </label>

            <label>Back Side Photo:
              <input
                type="file"
                required
              />
            </label>
          </div>

          <div className="section vehicle-classes">
            <label>Drivable Vehicle Classes:</label>
            <div className="vehicle-options">
              <label><input type="checkbox" name="vehicle-classes" value="Light Motor Cycle - A1" ononChange={handleChange} /> Light Motor Cycle - A1</label>
              <label><input type="checkbox" name="vehicle-classes" value="Motorcycle - A" onChange={handleChange} /> Motorcycle - A</label>
              <label><input type="checkbox" name="vehicle-classes" value="Motor Tricycle - B1" onChange={handleChange} /> Motor Tricycle - B1</label>
              <label><input type="checkbox" name="vehicle-classes" value="Dual Purpose Motor Vehicle - B" onChange={handleChange} /> Dual Purpose Motor Vehicle - B</label>
              <label><input type="checkbox" name="vehicle-classes" value="Light Motor Lorry - C1" onChange={handleChange} /> Light Motor Lorry - C1</label>
              <label><input type="checkbox" name="vehicle-classes" value="Motor Lorry - C" onChange={handleChange} /> Motor Lorry - C</label>
              <label><input type="checkbox" name="vehicle-classes" value="Heavy Motor Lorry - CE" onChange={handleChange} /> Heavy Motor Lorry - CE</label>
              <label><input type="checkbox" name="vehicle-classes" value="Light Motor Coach - D1" onChange={handleChange} /> Light Motor Coach - D1</label>
              <label><input type="checkbox" name="vehicle-classes" value="Motor Coach - D" onChange={handleChange} /> Motor Coach - D</label>
              <label><input type="checkbox" name="vehicle-classes" value="Heavy Motor Coach - DE" onChange={handleChange} /> Heavy Motor Coach - DE</label>
              <label><input type="checkbox" name="vehicle-classes" value="Hand Tractors - G1" onChange={handleChange} /> Hand Tractors - G1</label>
              <label><input type="checkbox" name="vehicle-classes" value="Agricultural Land Vehicle - G" onChange={handleChange} /> Agricultural Land Vehicle - G</label>
              <label><input type="checkbox" name="vehicle-classes" value="Special Purpose Vehicle - J" onChange={handleChange} /> Special Purpose Vehicle - J</label>
            </div>
          </div>

          <div className="section vehicle-classes">
            <label>If you have driving experience:</label>
            <div className="experience-options">
              <label><input type="radio" name="experience" onChange={() => handleDrivingExperience(true)} /> Yes</label>
              <label><input type="radio" name="experience" onChange={() => handleDrivingExperience(false)} /> No</label>
            </div>
          </div>

          {drivingExperience && (
            <label>Years of experience:
              <input
                type="number"
                name="yearsOfExperience"
                placeholder="add here"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                required
              />
            </label>
          )}

          <div>
            <button className="reg-btn" type="submit">Register</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default DriverReg;

