import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import UserAuth from "../Hooks/UserAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const IssueForm = () => {
  const [imagePreview, setImagePreview] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { user } = UserAuth();
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("image", e.target.files);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImagePreview(URL.createObjectURL(file));
      const dt = new DataTransfer();
      dt.items.add(file);
      setValue("image", dt.files);
    }
  };

  const handleGenerateAIDescription = async () => {
    const { title, category, location } = getValues();
    if (!title || !category || !location) {
      Swal.fire("Missing Fields", "Please fill in Title, Category, and Location first.", "warning");
      return;
    }
    setIsGenerating(true);
    try {
      const res = await axios.post("http://localhost:5000/generate-description", { title, category, location });
      const description = res.data?.description || res.data?.data?.description;
      if (description) {
        setValue("description", description);
      }
    } catch (err) {
      Swal.fire("Error", "Failed to generate AI description. Please try again.", "error");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSendIssus = async (data) => {
    const issueImage = data.image[0];
    const formData = new FormData();
    formData.append("image", issueImage);

    const imgApiUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

    const result = await Swal.fire({
      title: "Submit Issue?",
      text: "Are you sure you want to report this issue?",
      icon: "question",
      showCancelButton: true,
    });

    if (!result.isConfirmed) return;

    Swal.fire({
      title: "Uploading...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const imgRes = await axios.post(imgApiUrl, formData);
      const imageUrl = imgRes.data?.data?.display_url;

      const issueData = {
        ...data,
        image: imageUrl,
        email: user?.email,
      };

      const res = await axiosSecure.post("/issus", issueData);

      if (res.data.insertedId || res.data.success) {
        Swal.fire("Success!", "Issue submitted successfully!", "success");
        reset();
        setImagePreview("");
        navigate("/all-issus");
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <>
      <style>{`
        .if-root {
          min-height: 100vh;
          background: #07090f;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 20px;
          font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
        }

        .if-card {
          width: 100%;
          max-width: 760px;
          background: #0c0f1a;
          border: 1px solid #1a2040;
          border-radius: 24px;
          overflow: hidden;
        }

        /* ── HEADER ── */
        .if-header {
          padding: 40px 40px 32px;
          border-bottom: 1px solid #1a2040;
          background: linear-gradient(135deg, #0c0f1a 0%, #0f1525 100%);
        }
        @media (max-width: 600px) { .if-header { padding: 28px 24px 24px; } }

        .if-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #22c55e;
          margin-bottom: 12px;
        }
        .if-eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #22c55e;
          animation: blink 2s ease-in-out infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .if-title {
          font-size: clamp(24px, 4vw, 36px);
          font-weight: 800;
          color: #e8eaf0;
          letter-spacing: -0.025em;
          line-height: 1.15;
        }
        .if-title span {
          background: linear-gradient(90deg, #22c55e, #10b981);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .if-subtitle {
          font-size: 14px;
          color: #4a5580;
          margin-top: 8px;
          font-weight: 400;
        }

        /* ── FORM BODY ── */
        .if-body {
          padding: 36px 40px 40px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        @media (max-width: 600px) { .if-body { padding: 24px; gap: 16px; } }

        .if-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 600px) { .if-row { grid-template-columns: 1fr; } }

        /* ── FIELD ── */
        .if-field {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }
        .if-field.span2 { grid-column: span 2; }
        @media (max-width: 600px) { .if-field.span2 { grid-column: span 1; } }

        .if-label {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #4a5580;
        }

        .if-input,
        .if-select,
        .if-textarea {
          background: #0f1320;
          border: 1px solid #1e2540;
          border-radius: 12px;
          padding: 13px 16px;
          font-size: 14px;
          font-weight: 500;
          color: #c8cfe8;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          width: 100%;
          box-sizing: border-box;
          font-family: inherit;
        }
        .if-input::placeholder,
        .if-textarea::placeholder { color: #2e3a5a; }

        .if-input:focus,
        .if-select:focus,
        .if-textarea:focus {
          border-color: #22c55e50;
          box-shadow: 0 0 0 3px #22c55e15;
        }

        .if-input.err,
        .if-select.err,
        .if-textarea.err {
          border-color: #ef444450;
        }

        .if-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%234a5580' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
          cursor: pointer;
        }
        .if-select option { background: #0c0f1a; color: #c8cfe8; }

        .if-textarea { resize: none; height: 120px; line-height: 1.6; }

        .if-error {
          font-size: 11px;
          color: #f87171;
          font-weight: 500;
          margin-top: 2px;
        }

        /* ── UPLOAD ZONE ── */
        .if-upload-zone {
          border: 1.5px dashed #1e2540;
          border-radius: 14px;
          padding: 28px 20px;
          text-align: center;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
          background: #0f1320;
          position: relative;
        }
        .if-upload-zone.drag-over {
          border-color: #22c55e60;
          background: #0d1f14;
        }
        .if-upload-zone:hover {
          border-color: #22c55e40;
          background: #0f1822;
        }

        .if-upload-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #141d30;
          border: 1px solid #1e2540;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 12px;
          font-size: 20px;
        }

        .if-upload-title {
          font-size: 14px;
          font-weight: 600;
          color: #c8cfe8;
          margin-bottom: 4px;
        }
        .if-upload-sub {
          font-size: 12px;
          color: #4a5580;
        }
        .if-upload-sub span {
          color: #22c55e;
          font-weight: 600;
        }

        .if-upload-input {
          position: absolute;
          inset: 0;
          opacity: 0;
          cursor: pointer;
          width: 100%;
          height: 100%;
        }

        .if-preview {
          margin-top: 14px;
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #1e2540;
        }
        .if-preview img {
          width: 100%;
          max-height: 220px;
          object-fit: cover;
          display: block;
        }
        .if-preview-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background: #0c0f1a90;
          backdrop-filter: blur(8px);
          border: 1px solid #1e2540;
          border-radius: 8px;
          padding: 4px 10px;
          font-size: 11px;
          color: #22c55e;
          font-weight: 600;
        }

        /* ── AI BUTTON ── */
        .if-ai-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 18px;
          border: 1px solid #1e2540;
          border-radius: 10px;
          background: #0f1320;
          color: #22c55e;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
          align-self: flex-start;
        }
        .if-ai-btn:hover:not(:disabled) {
          border-color: #22c55e60;
          background: #0d1f14;
        }
        .if-ai-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          color: #4a5580;
        }

        /* ── SUBMIT ── */
        .if-submit-wrap {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-top: 4px;
        }

        .if-submit {
          width: 100%;
          padding: 15px;
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, #16a34a, #15803d);
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          letter-spacing: 0.01em;
          transition: all 0.2s ease;
          font-family: inherit;
          box-shadow: 0 4px 24px #22c55e25;
        }
        .if-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px #22c55e35;
          background: linear-gradient(135deg, #15803d, #166534);
        }
        .if-submit:active { transform: translateY(0); }

        .if-user-tag {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 12px;
          color: #2e3a5a;
          font-weight: 500;
        }
        .if-user-tag span {
          color: #4a5580;
          font-weight: 600;
        }
      `}</style>

      <div className="if-root">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ width: "100%", maxWidth: 760 }}
        >
          <div className="if-card">

            {/* HEADER */}
            <div className="if-header">
              <div className="if-eyebrow">
                <span className="if-eyebrow-dot" />
                Civic Reporting
              </div>
              <h1 className="if-title">
                Report an <span>Issue</span>
              </h1>
              <p className="if-subtitle">
                Help improve your city — describe the problem and we'll make sure it's addressed.
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit(handleSendIssus)} className="if-body">

              {/* TITLE */}
              <div className="if-field">
                <label className="if-label">Issue Title</label>
                <input
                  {...register("title", { required: true })}
                  placeholder="e.g. Broken streetlight on Main St."
                  className={`if-input ${errors.title ? "err" : ""}`}
                />
                {errors.title && <span className="if-error">Title is required</span>}
              </div>

              {/* CATEGORY + LOCATION */}
              <div className="if-row">
                <div className="if-field">
                  <label className="if-label">Category</label>
                  <select
                    {...register("category", { required: true })}
                    className={`if-select ${errors.category ? "err" : ""}`}
                  >
                    <option value="">Select category</option>
                    <option value="Road">Road</option>
                    <option value="Water">Water</option>
                    <option value="Electricity">Electricity</option>
                  </select>
                  {errors.category && <span className="if-error">Category is required</span>}
                </div>

                <div className="if-field">
                  <label className="if-label">Location</label>
                  <input
                    {...register("location", { required: true })}
                    placeholder="e.g. Dhaka, Mirpur-10"
                    className={`if-input ${errors.location ? "err" : ""}`}
                  />
                  {errors.location && <span className="if-error">Location is required</span>}
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="if-field">
                <label className="if-label">Description</label>
                <textarea
                  {...register("description", { required: true })}
                  placeholder="Describe the issue in detail — what happened, when, and any relevant context..."
                  className={`if-textarea ${errors.description ? "err" : ""}`}
                />
                <button
                  type="button"
                  className="if-ai-btn"
                  onClick={handleGenerateAIDescription}
                  disabled={isGenerating}
                >
                  {isGenerating ? "Generating..." : "Suggest AI Description"}
                </button>
                {errors.description && <span className="if-error">Description is required</span>}
              </div>

              {/* IMAGE UPLOAD */}
              <div className="if-field">
                <label className="if-label">Photo Evidence</label>
                <div
                  className={`if-upload-zone ${isDragging ? "drag-over" : ""}`}
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                >
                  <input
                    {...register("image", { required: !imagePreview })}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="if-upload-input"
                  />
                  <div className="if-upload-icon">📷</div>
                  <p className="if-upload-title">Drop image here or click to browse</p>
                  <p className="if-upload-sub">
                    <span>Click to upload</span> · PNG, JPG, WEBP supported
                  </p>
                </div>

                {imagePreview && (
                  <div className="if-preview">
                    <img src={imagePreview} alt="Preview" />
                    <span className="if-preview-badge">✓ Image selected</span>
                  </div>
                )}
                {errors.image && <span className="if-error">Photo is required</span>}
              </div>

              {/* SUBMIT */}
              <div className="if-submit-wrap">
                <motion.button
                  type="submit"
                  className="if-submit"
                  whileTap={{ scale: 0.98 }}
                >
                  Submit Issue Report
                </motion.button>

                <div className="if-user-tag">
                  Submitting as <span>{user?.email}</span>
                </div>
              </div>

            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default IssueForm;