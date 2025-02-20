// app/appointment/page.tsx
"use client";
import { useState } from "react";
import { useAuth } from "@/components/Auth/AuthProvider";
import { db } from "@/lib/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookingPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const [formData, setFormData] = useState({
    // Basic Information
    fullName: "",
    email: "",
    phone: "",
    alternatePhone: "",

    // Shoot Details
    shootType: "",
    numberOfDays: 1,
    startTime: "",
    endTime: "",
    venue: "",
    locationType: "indoor",
    numberOfPeople: 1,
    photographyStyle: "",
    videoRequired: false,

    // Additional Services
    dronePhotography: false,
    liveStreaming: false,
    makeupNeeded: false,
    propsRequired: false,
    wardrobeAssistance: false,
    backdropSetup: false,

    // Deliverables
    editedPhotosCount: "",
    rawPhotos: false,
    albumRequired: false,
    videoFormat: "",
    deliveryMode: "",

    // Budget & Payment
    budget: "",
    advancePayment: false,
    paymentMode: "",

    // Special Requests
    specialInstructions: "",
  });

  const shootTypes = [
    "Wedding",
    "Pre-wedding",
    "Maternity",
    "Fashion",
    "Portfolio",
    "Product",
    "Event",
  ];

  const photographyStyles = [
    "Candid",
    "Traditional",
    "Cinematic",
    "Documentary",
    "Fine Art",
  ];

  const checkDateTimeClash = async (
    dates: Date[],
    startTime: string,
    endTime: string
  ) => {
    const bookingsRef = collection(db, "bookings");
    for (const date of dates) {
      const dateStr = date.toISOString().split("T")[0];
      const q = query(bookingsRef, where("dates", "array-contains", dateStr));

      const querySnapshot = await getDocs(q);
      for (const doc of querySnapshot.docs) {
        const booking = doc.data();
        if (
          (startTime >= booking.startTime && startTime <= booking.endTime) ||
          (endTime >= booking.startTime && endTime <= booking.endTime)
        ) {
          return true; // Clash found
        }
      }
    }
    return false; // No clash
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please sign in to book an appointment");
      return;
    }

    try {
      setLoading(true);

      // Check for date/time clashes
      const hasClash = await checkDateTimeClash(
        selectedDates,
        formData.startTime,
        formData.endTime
      );

      if (hasClash) {
        toast.error("Selected date and time slot is already booked");
        return;
      }

      // Add booking to Firebase
      const bookingRef = await addDoc(collection(db, "bookings"), {
        userId: user.uid,
        status: "booked",
        dates: selectedDates.map((date) => date.toISOString().split("T")[0]),
        createdAt: new Date().toISOString(),
        ...formData,
      });

      toast.success("Appointment booked successfully!");
      router.push("/"); // Redirect to home page
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Book a Photoshoot</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="tel"
              placeholder="Alternate Phone (Optional)"
              value={formData.alternatePhone}
              onChange={(e) =>
                setFormData({ ...formData, alternatePhone: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>
        </section>

        {/* Shoot Details */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Shoot Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              value={formData.shootType}
              onChange={(e) =>
                setFormData({ ...formData, shootType: e.target.value })
              }
              required
              className="w-full p-2 border rounded"
            >
              <option value="">Select Shoot Type</option>
              {shootTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <div>
              <DatePicker
                selected={null}
                onChange={(date) => date && setSelectedDates([date])}
                inline
                className="w-full p-2 border rounded"
              />
            </div>

            <input
              type="time"
              value={formData.startTime}
              onChange={(e) =>
                setFormData({ ...formData, startTime: e.target.value })
              }
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="time"
              value={formData.endTime}
              onChange={(e) =>
                setFormData({ ...formData, endTime: e.target.value })
              }
              required
              className="w-full p-2 border rounded"
            />

            <textarea
              placeholder="Venue/Location"
              value={formData.venue}
              onChange={(e) =>
                setFormData({ ...formData, venue: e.target.value })
              }
              required
              className="w-full p-2 border rounded"
            />

            <div className="flex gap-4">
              <label>
                <input
                  type="radio"
                  name="locationType"
                  value="indoor"
                  checked={formData.locationType === "indoor"}
                  onChange={(e) =>
                    setFormData({ ...formData, locationType: e.target.value })
                  }
                />{" "}
                Indoor
              </label>
              <label>
                <input
                  type="radio"
                  name="locationType"
                  value="outdoor"
                  checked={formData.locationType === "outdoor"}
                  onChange={(e) =>
                    setFormData({ ...formData, locationType: e.target.value })
                  }
                />{" "}
                Outdoor
              </label>
              <label>
                <input
                  type="radio"
                  name="locationType"
                  value="both"
                  checked={formData.locationType === "both"}
                  onChange={(e) =>
                    setFormData({ ...formData, locationType: e.target.value })
                  }
                />{" "}
                Both
              </label>
            </div>
          </div>
        </section>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/80 transition-colors"
        >
          {loading ? "Booking..." : "Book Appointment"}
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
