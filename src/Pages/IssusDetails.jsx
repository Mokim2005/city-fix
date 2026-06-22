import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import UserAuth from "../Hooks/UserAuth";
import Swal from "sweetalert2";
import Loading from "../Components/Loading";

const statusColor = (status) => {
  const map = {
    Open: { bg: "#0d2a1f", text: "#22c55e", dot: "#22c55e" },
    "In Progress": { bg: "#1a2340", text: "#60a5fa", dot: "#60a5fa" },
    Resolved: { bg: "#1f1a2e", text: "#a78bfa", dot: "#a78bfa" },
    Closed: { bg: "#1e1e1e", text: "#9ca3af", dot: "#9ca3af" },
  };
  return map[status] || { bg: "#1e1e1e", text: "#9ca3af", dot: "#9ca3af" };
};

const priorityStyle = (priority) => {
  const map = {
    Normal: { bg: "#1a2340", text: "#60a5fa", border: "#3b82f620" },
    High: { bg: "#2a1a00", text: "#f59e0b", border: "#f59e0b20" },
    Critical: { bg: "#2a0d0d", text: "#ef4444", border: "#ef444420" },
  };
  return map[priority] || { bg: "#1a2340", text: "#60a5fa", border: "#3b82f620" };
};

const IssueDetails = () => {
  const { id } = useParams();
  const axiosSecure = UseAxiosSecure();
  const { user } = UserAuth();
  const navigate = useNavigate();

  const [issue, setIssue] = useState(null);
  const cardRef = useRef(null);

  useEffect(() => {
    axiosSecure.get(`/issus/${id}`).then((res) => {
      setIssue(res.data);
    });
  }, [id, axiosSecure]);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }
      );
    }
  }, [issue]);

  if (!issue) return <Loading />;

  const isOwner = issue.email === user?.email;
  const isPriority = issue.priority === "Normal";
  const sc = statusColor(issue.status);
  const pc = priorityStyle(issue.priority);

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This issue will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/issus/${id}`).then(() => {
          Swal.fire("Deleted!", "Issue removed successfully.", "success");
          navigate("/all-issus");
        });
      }
    });
  };

  const handleBoost = async () => {
    const res = await axiosSecure.post("/create-checkout-session", {
      email: user.email,
      issueId: issue._id,
      purpose: "boost",
    });
    window.location.href = res.data.url;
  };

  return (
    <>
      <style>{`
        .id-root {
          min-height: 100vh;
          background: #07090f;
          color: #e8eaf0;
          font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
          padding: 0 0 80px 0;
        }

        /* ── HERO ── */
        .id-hero {
          position: relative;
          width: 100%;
          height: 420px;
          overflow: hidden;
        }
        @media (min-width: 768px) { .id-hero { height: 560px; } }

        .id-hero img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.7s ease;
        }
        .id-hero:hover img { transform: scale(1.04); }

        .id-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            #07090f 0%,
            rgba(7,9,15,0.75) 40%,
            rgba(7,9,15,0.2) 100%
          );
        }

        .id-hero-badge {
          position: absolute;
          top: 24px;
          left: 24px;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          border: 1px solid;
        }

        .id-hero-badge .pulse-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          animation: pulse-ring 2s ease-out infinite;
        }

        @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0 currentColor; opacity: 1; }
          70%  { box-shadow: 0 0 0 6px transparent; opacity: 0.6; }
          100% { box-shadow: 0 0 0 0 transparent; opacity: 1; }
        }

        .id-hero-title {
          position: absolute;
          bottom: 32px;
          left: 24px;
          right: 24px;
          font-size: clamp(26px, 5vw, 52px);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: #fff;
          text-shadow: 0 2px 24px rgba(0,0,0,0.6);
          max-width: 800px;
        }

        /* ── WRAPPER ── */
        .id-wrap {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* ── META STRIP ── */
        .id-meta-strip {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin: 32px 0;
        }
        @media (min-width: 640px)  { .id-meta-strip { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 1024px) { .id-meta-strip { grid-template-columns: repeat(5, 1fr); } }

        .id-meta-card {
          background: #0f1320;
          border: 1px solid #1e2540;
          border-radius: 14px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          transition: border-color 0.25s, transform 0.25s;
        }
        .id-meta-card:hover {
          border-color: #00d4ff30;
          transform: translateY(-3px);
        }
        .id-meta-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #4a5580;
        }
        .id-meta-value {
          font-size: 15px;
          font-weight: 700;
          color: #c8cfe8;
        }

        /* status card special */
        .id-meta-status {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 999px;
          width: fit-content;
        }

        /* upvote card special */
        .id-upvote-val {
          font-size: 26px;
          font-weight: 800;
          color: #00d4ff;
          line-height: 1;
        }

        /* ── SECTION DIVIDER ── */
        .id-divider {
          height: 1px;
          background: linear-gradient(90deg, #00d4ff20, #a78bfa20, transparent);
          margin: 40px 0;
        }

        /* ── DESCRIPTION ── */
        .id-desc {
          font-size: 16px;
          line-height: 1.8;
          color: #8a93b8;
          max-width: 780px;
        }

        /* ── SECTION HEADING ── */
        .id-section-head {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 28px;
        }
        .id-section-head-line {
          width: 3px;
          height: 24px;
          border-radius: 2px;
          background: linear-gradient(180deg, #00d4ff, #a78bfa);
          flex-shrink: 0;
        }
        .id-section-head h2 {
          font-size: 20px;
          font-weight: 700;
          color: #c8cfe8;
          letter-spacing: -0.01em;
        }

        /* ── TIMELINE ── */
        .id-timeline {
          position: relative;
          padding-left: 28px;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .id-timeline::before {
          content: '';
          position: absolute;
          left: 6px;
          top: 8px;
          bottom: 8px;
          width: 1px;
          background: linear-gradient(180deg, #00d4ff40, #a78bfa20);
        }

        .id-tl-item {
          position: relative;
          padding-bottom: 28px;
        }
        .id-tl-item:last-child { padding-bottom: 0; }

        .id-tl-dot {
          position: absolute;
          left: -25px;
          top: 14px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #00d4ff;
          border: 2px solid #07090f;
          box-shadow: 0 0 10px #00d4ff60;
          transition: transform 0.2s;
        }
        .id-tl-item:hover .id-tl-dot { transform: scale(1.4); }

        .id-tl-card {
          background: #0f1320;
          border: 1px solid #1e2540;
          border-radius: 14px;
          padding: 18px 20px;
          transition: border-color 0.25s, background 0.25s;
        }
        .id-tl-card:hover {
          border-color: #00d4ff25;
          background: #111828;
        }
        .id-tl-text {
          font-size: 15px;
          font-weight: 500;
          color: #c8cfe8;
          line-height: 1.6;
        }
        .id-tl-date {
          font-size: 12px;
          color: #4a5580;
          margin-top: 6px;
          font-weight: 500;
        }

        /* ── ACTION BUTTONS ── */
        .id-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 40px;
          align-items: center;
        }

        .id-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: all 0.2s ease;
          text-decoration: none;
          letter-spacing: 0.01em;
        }

        .id-btn-delete {
          background: #1a0d0d;
          color: #f87171;
          border: 1px solid #ef444430;
        }
        .id-btn-delete:hover {
          background: #2a1212;
          border-color: #ef444470;
          transform: translateY(-1px);
          box-shadow: 0 4px 20px #ef444420;
        }

        .id-btn-boost {
          background: linear-gradient(135deg, #0066ff, #7c3aed);
          color: #fff;
          border: 1px solid transparent;
        }
        .id-btn-boost:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 28px rgba(0,102,255,0.35);
        }

        .id-back-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
          color: #4a5580;
          text-decoration: none;
          letter-spacing: 0.02em;
          transition: color 0.2s;
          margin-left: auto;
        }
        .id-back-link:hover { color: #00d4ff; }
      `}</style>

      <div className="id-root">
        <motion.div ref={cardRef} initial={{ opacity: 0 }}>

          {/* ── HERO IMAGE ── */}
          <div className="id-hero">
            <img src={issue.image} alt={issue.title} />
            <div className="id-hero-overlay" />

            {/* Status badge */}
            <div
              className="id-hero-badge"
              style={{
                background: sc.bg,
                color: sc.text,
                borderColor: sc.dot + "50",
              }}
            >
              <span
                className="pulse-dot"
                style={{ background: sc.dot, color: sc.dot }}
              />
              {issue.status}
            </div>

            <h1 className="id-hero-title">{issue.title}</h1>
          </div>

          {/* ── BODY ── */}
          <div className="id-wrap">

            {/* META STRIP */}
            <div className="id-meta-strip">

              <div className="id-meta-card">
                <span className="id-meta-label">Category</span>
                <span className="id-meta-value">{issue.category}</span>
              </div>

              <div className="id-meta-card">
                <span className="id-meta-label">Location</span>
                <span className="id-meta-value">{issue.location}</span>
              </div>

              <div className="id-meta-card">
                <span className="id-meta-label">Status</span>
                <span
                  className="id-meta-status"
                  style={{ background: sc.bg, color: sc.text }}
                >
                  <span style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: sc.dot, display: 'inline-block', flexShrink: 0
                  }} />
                  {issue.status}
                </span>
              </div>

              <div className="id-meta-card">
                <span className="id-meta-label">Priority</span>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: 13,
                    fontWeight: 700,
                    background: pc.bg,
                    color: pc.text,
                    border: `1px solid ${pc.border}`,
                    width: 'fit-content'
                  }}
                >
                  {issue.priority}
                </span>
              </div>

              <div className="id-meta-card">
                <span className="id-meta-label">Upvotes</span>
                <span className="id-upvote-val">
                  ↑ {issue.upvote}
                </span>
              </div>

            </div>

            {/* DIVIDER */}
            <div className="id-divider" />

            {/* DESCRIPTION */}
            <p className="id-desc">{issue.description}</p>

            {/* TIMELINE */}
            {issue.timeline?.length > 0 && (
              <>
                <div className="id-divider" />
                <div className="id-section-head">
                  <div className="id-section-head-line" />
                  <h2>Update Timeline</h2>
                </div>

                <div className="id-timeline">
                  {issue.timeline.map((t, index) => (
                    <motion.div
                      key={index}
                      className="id-tl-item"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.07 }}
                    >
                      <div className="id-tl-dot" />
                      <div className="id-tl-card">
                        <p className="id-tl-text">{t.text}</p>
                        <p className="id-tl-date">
                          {new Date(t.date).toLocaleString()}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}

            {/* ACTIONS */}
            <div className="id-actions">
              {isOwner && (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleDelete}
                  className="id-btn id-btn-delete"
                >
                  Delete Issue
                </motion.button>
              )}

              {isPriority && (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleBoost}
                  className="id-btn id-btn-boost"
                >
                  ⚡ Boost Priority
                </motion.button>
              )}

              <Link to="/all-issus" className="id-back-link">
                ← Back to Issues
              </Link>
            </div>

          </div>
        </motion.div>
      </div>
    </>
  );
};

export default IssueDetails;