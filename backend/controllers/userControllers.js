import User from "../models/userModel";
import Address from "../models/addressModel";


// Address management controllers

export const addAddress = async (req, res) => {
  const { title, line1, line2, city, state, zipCode, country } = req.body;
  const userId = req.user._id; // From authenticated middleware

  try {
    const newAddress = new Address({
      userId,
      title,
      line1,
      line2,
      city,
      state,
      zipCode,
      country,
    });

    const savedAddress = await newAddress.save();

    // Update user document to include this address ID
    await User.findByIdAndUpdate(userId, {
      $push: { address: savedAddress._id },
    });

    res.status(201).json(savedAddress);
  } catch (error) {
    console.error("Add Address Error:", error);
    res.status(500).json({ message: "Failed to add address" });
  }
};

export const updateAddress = async (req, res) => {
  const { addressId } = req.params;
  const userId = req.user._id;
  const updates = req.body; // Only include fields that need updating

  try {
    const address = await Address.findById(addressId);
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    if (!address.userId.equals(userId)) {
      return res.status(403).json({ message: "Unauthorized to update this address" });
    }

    Object.assign(address, updates); // Merge updates into address
    const updatedAddress = await address.save();

    res.json(updatedAddress);
  } catch (error) {
    console.error("Update Address Error:", error);
    res.status(500).json({ message: "Failed to update address" });
  }
};

export const deleteAddress = async (req, res) => {
  const { addressId } = req.params;
  const userId = req.user._id;

  try {
    const address = await Address.findById(addressId);
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    if (!address.userId.equals(userId)) {
      return res.status(403).json({ message: "Unauthorized to delete this address" });
    }

    await Address.findByIdAndDelete(addressId);

    await User.findByIdAndUpdate(userId, {
      $pull: { addresses: addressId },
    });

    res.json({ message: "Address deleted successfully" });
  } catch (error) {
    console.error("Delete Address Error:", error);
    res.status(500).json({ message: "Failed to delete address" });
  }
};

