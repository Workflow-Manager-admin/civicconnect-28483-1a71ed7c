import React, { useState } from "react";
import "./App.css";

// PUBLIC_INTERFACE
const ISSUE_CATEGORIES = [
  {
    key: "pothole",
    name: "Pothole",
    color: "#F44336",
    icon: (
      <svg height="22" width="22" viewBox="0 0 24 24" fill="#F44336">
        <circle cx="12" cy="19" r="2"/>
        <ellipse cx="12" cy="7" rx="9" ry="5"/>
        <ellipse cx="12" cy="7" rx="6" ry="3"/>
      </svg>
    ),
  },
  {
    key: "obstruction",
    name: "Obstruction",
    color: "#9C27B0",
    icon: (
      <svg width="22" height="22" fill="#9C27B0" viewBox="0 0 24 24"><rect x="5" y="9" width="14" height="6" rx="2"/><path d="M7 3v3m10-3v3" stroke="#9C27B0" strokeWidth="2" strokeLinecap="round"/></svg>
    ),
  },
  {
    key: "waste",
    name: "Waste Dump",
    color: "#4CAF50",
    icon: (
      <svg width="22" height="22" fill="#4CAF50" viewBox="0 0 24 24"><circle cx="12" cy="17" r="4"/><path d="M16 9c0-2.209-1.791-4-4-4S8 6.791 8 9"/></svg>
    ),
  },
  {
    key: "electric",
    name: "Electric Wire Snap",
    color: "#FFC107",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="#FFC107"><polyline points="11 2 6 12 12 12 9 20 16 8 11 8" stroke="#FFC107" fill="none" strokeWidth="2"/></svg>
    ),
  },
  {
    key: "signal",
    name: "Traffic Signal Fault",
    color: "#2196F3",
    icon: (
      <svg width="22" height="22" fill="#2196F3" viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="17" rx="3"/><circle cx="12" cy="7" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="17" r="2"/></svg>
    ),
  },
  {
    key: "parking",
    name: "Illegal Parking",
    color: "#FF5722",
    icon: (
      <svg width="22" height="22" fill="#FF5722" viewBox="0 0 24 24"><rect x="5" y="12" width="14" height="6" rx="2"/><circle cx="8" cy="19" r="2"/><circle cx="16" cy="19" r="2"/></svg>
    ),
  },
  {
    key: "encroachment",
    name: "Encroachment",
    color: "#E91E63",
    icon: (
      <svg width="22" height="22" fill="#E91E63" viewBox="0 0 24 24"><rect x="4" y="10" width="16" height="6" rx="2"/><path d="M8 10V6a4 4 0 0 1 8 0v4"/></svg>
    ),
  },
  {
    key: "drainage",
    name: "Drainage Issue",
    color: "#00BCD4",
    icon: (
      <svg width="22" height="22" fill="#00BCD4" viewBox="0 0 24 24"><ellipse cx="12" cy="16" rx="8" ry="3"/><path d="M8 10c0-2.209 1.791-4 4-4s4 1.791 4 4"/></svg>
    ),
  },
];

const STATUS_COLORS = {
  submitted: "#ffa500",
  in_progress: "#2196F3",
  resolved: "#43A047",
};

// Demo location for issue map rendering (centered in a city)
const CITY_CENTER = { lat: 12.9716, lng: 77.5946 }; // Example: Bangalore

// PUBLIC_INTERFACE
function CivicNavBar({ onNavSelect, selected }) {
  return (
    <nav className="navbar">
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
          <div className="logo" style={{fontWeight: "700", fontSize: "1.2rem", color: "#fff" }}>
            <span className="logo-symbol" style={{color: "var(--base-light)", fontSize: "1.8rem"}}>◎</span> CivicConnect
          </div>
          <div className="nav-links">
            {["Home", "Report", "My Reports", "About"].map((route) => (
              <button
                key={route}
                className={`btn nav-btn${selected===route?" selected":""}`}
                onClick={() => onNavSelect(route)}
                style={selected===route?{background: "var(--base-light)", color:"#121212"}:{}}
              >
                {route}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

// PUBLIC_INTERFACE
function IssueCategoryPicker({ value, onChange }) {
  return (
    <div className="cc-category-picker">
      {ISSUE_CATEGORIES.map((cat) => (
        <label
          key={cat.key}
          className={`cat-choice${value===cat.key ? " selected" : ""}`}
          style={{
            borderColor: value===cat.key ? cat.color : "var(--border-color)",
            color: value===cat.key ? "#222" : "var(--text-color)",
            background: value===cat.key ? cat.color : "transparent",
          }}
        >
          <input
            type="radio"
            name="issueCategory"
            value={cat.key}
            checked={value===cat.key}
            onChange={() => onChange(cat.key)}
            style={{ display: "none" }}
          />
          <span className="cat-icon">{cat.icon}</span>
          <span>{cat.name}</span>
        </label>
      ))}
    </div>
  );
}

// PUBLIC_INTERFACE
function ImageUploader({ value, onChange }) {
  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onChange(e.target.files[0]);
    }
  };
  return (
    <div className="img-uploader">
      <label className="btn" style={{marginRight:8}}>
        Upload Image
        <input type="file" accept="image/*" style={{display:'none'}} onChange={handleChange} />
      </label>
      {value && <img src={URL.createObjectURL(value)} alt="Preview" className="img-preview" style={{height:36,marginLeft:10,borderRadius:6}} />}
    </div>
  );
}

// PUBLIC_INTERFACE
function LocationSelector({ value, onChange }) {
  // For demo, we use simple latitude/longitude input (normally a map picker)
  return (
    <div className="form-row" style={{gap:8}}>
      <input
        type="number"
        placeholder="Latitude"
        className="form-input"
        value={value.lat}
        onChange={e => onChange({...value, lat: e.target.value})}
        step="any"
        style={{width:"48%"}}
      />
      <input
        type="number"
        placeholder="Longitude"
        className="form-input"
        value={value.lng}
        onChange={e => onChange({...value, lng: e.target.value})}
        step="any"
        style={{width:"48%"}}
      />
    </div>
  );
}

// PUBLIC_INTERFACE
function IssueReportForm({ onSubmit, onCancel }) {
  const [category, setCategory] = useState(ISSUE_CATEGORIES[0].key);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(CITY_CENTER);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      category,
      description,
      image,
      location,
      date: new Date().toISOString(),
      status: "submitted"
    });
  };

  return (
    <form className="cc-issue-form" onSubmit={handleSubmit}>
      <h2>Report an Issue</h2>
      <IssueCategoryPicker value={category} onChange={setCategory} />
      <textarea
        className="form-input"
        placeholder="Describe the issue..."
        required
        minLength={10}
        rows={4}
        value={description}
        onChange={e=>setDescription(e.target.value)}
        style={{marginTop:16, width:"100%"}}
      />
      <div className="form-row">
        <ImageUploader value={image} onChange={setImage} />
      </div>
      <div className="form-row" style={{marginTop: 8}}>
        <LocationSelector value={location} onChange={setLocation} />
      </div>
      <div className="form-row" style={{ justifyContent:'flex-end', gap:8, marginTop:24 }}>
        <button type="button" className="btn btn-cancel" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn-large">Submit</button>
      </div>
    </form>
  );
}

// PUBLIC_INTERFACE
function IssueCard({ issue, compact }) {
  const catData = ISSUE_CATEGORIES.find(c => c.key === issue.category) || {};
  return (
    <div className="issue-card" style={{
      borderLeft: `5px solid ${catData.color || "#fff"}`,
      background: "#21223a",
      color: "#fff",
      margin: compact ? "6px 0" : "12px 0",
      display: "flex",
      flexDirection: compact ? "row" : "column",
      alignItems: compact ? "center" : "flex-start",
      gap: compact ? 12 : 0,
      borderRadius: 8,
      padding: compact ? "10px" : "16px",
      boxShadow: "0 1px 8px rgba(0,0,0,0.15)",
      minWidth:0,
      width: compact ? "100%" : undefined
    }}>
      <div className="cat-icon" style={{marginRight:compact?"8px":0, minWidth:26}}>{catData.icon}</div>
      <div style={{width: "100%"}}>
        <div style={{ fontWeight: 600, color: catData.color, fontSize: "1.1rem" }}>
          {catData.name}
        </div>
        <div style={{ fontSize: ".97rem", margin: "3px 0", color: "var(--text-color)" }}>{issue.description}</div>
        <div style={{ fontSize: ".8rem", color:"var(--text-secondary)", marginTop: 4 }}>
          {issue.location && (
            <span>
              <span role="img" aria-label="location">📍</span>
              {parseFloat(issue.location.lat).toFixed(4)}, {parseFloat(issue.location.lng).toFixed(4)}
            </span>
          )}
          {" | "}
          <span style={{
            background: STATUS_COLORS[issue.status],
            color: "#181818",
            borderRadius: 4,
            padding: "2px 7px",
            marginLeft: 6,
            fontWeight: 600,
            fontSize: ".8rem",
          }}>{issue.status.replace("_", " ")}</span>
        </div>
        {issue.image && !compact && (
          <img src={URL.createObjectURL(issue.image)} alt="Issue" style={{width: "100%", margin:"10px 0 5px 0", borderRadius:7, maxHeight:160, objectFit:"cover"}} />
        )}
        <div style={{fontSize: ".75rem", color:"var(--text-secondary)"}}>
          Reported {new Date(issue.date).toLocaleString(undefined, {dateStyle: "short", timeStyle:"short"})}
        </div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function IssueDashboard({ issues, filterCat, setFilterCat, viewMode, setViewMode }) {
  // We'll use a simple Un-google-maps div map for demo purposes
  return (
    <section className="cc-dashboard">
      <div className="dashboard-head" style={{display:'flex',flexWrap:'wrap',gap:20,alignItems:"center",justifyContent:"space-between"}}>
        <div style={{fontSize: "2rem", fontWeight:700, color: "var(--base-light)"}}>Recent Reports</div>
        <div style={{ display: "flex", gap:8 }}>
          <select className="form-input" value={filterCat} onChange={e=>setFilterCat(e.target.value)}>
            <option value="">All Categories</option>
            {ISSUE_CATEGORIES.map(cat=>(
              <option key={cat.key} value={cat.key}>{cat.name}</option>
            ))}
          </select>
          <button className={`btn btn-plain${viewMode==="map"?" selected":""}`} onClick={()=>setViewMode("map")}>Map</button>
          <button className={`btn btn-plain${viewMode==="list"?" selected":""}`} onClick={()=>setViewMode("list")}>List</button>
        </div>
      </div>
      <div style={{marginTop:20}}>
        {viewMode === "map" ?
          <IssueMap issues={issues} /> :
          <div>
            {issues.length===0 && <div className="empty-message">No reports found.</div>}
            <div>
              {issues.map((issue, idx) =>
                <IssueCard key={idx} issue={issue} compact={true} />
              )}
            </div>
          </div>
        }
      </div>
    </section>
  );
}

// PUBLIC_INTERFACE
function IssueMap({ issues }) {
  // DEMO Only: Simulate a city map with SVG, show markers with status color
  // In a real app, use leaflet/react-leaflet or Google Maps

  const width = 1000, height = 350;
  // Center markers into SVG canvas
  function latLngToXY(lat, lng) {
    // Fake conversion for demo; city ~ (12.86-13.06N, 77.50-77.70E)
    const minLat = 12.86, maxLat = 13.06, minLng = 77.50, maxLng = 77.70;
    const x = ((parseFloat(lng)-minLng)/(maxLng-minLng))*width * 0.9 + width*0.05;
    const y = ((maxLat-parseFloat(lat))/(maxLat-minLat))*height * 0.8 + height*0.1;
    return [x, y];
  }

  return (
    <div className="cc-map-container" style={{background:"#191930", borderRadius:8, margin:"auto", overflow:"auto"}}>
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} style={{minHeight:220, width:"100%", display:'block'}}>
        {/* City outline for demo */}
        <rect x={30} y={50} width={width-60} height={height-100} fill="#232344" rx={36}/>
        {issues.map((issue, idx) => {
          const [x, y] = latLngToXY(issue.location.lat, issue.location.lng);
          const cat = ISSUE_CATEGORIES.find(c=>c.key===issue.category)||{color:"#fff"};
          return (
            <g key={idx} style={{cursor:"pointer"}}>
              <circle
                cx={x} cy={y} r={16}
                fill={cat.color}
                stroke="#fff"
                strokeWidth={3}
                opacity={0.94}
              />
              <text x={x} y={y+6} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#191930">
                {cat.icon}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// PUBLIC_INTERFACE
function MyReports({ issues }) {
  const mine = issues.filter(isMine);
  function isMine(issue) {
    // Placeholder: All submitted in this session are 'my' reports
    return true;
  }
  return (
    <div className="my-reports">
      <h2>My Reports</h2>
      <div>
        {mine.length === 0 && <div className="empty-message">You haven't reported any issues yet.</div>}
        {mine.map((issue, idx) => <IssueCard issue={issue} key={idx} />)}
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function AboutSection() {
  return (
    <div className="about-section">
      <h2>About CivicConnect</h2>
      <p>
        CivicConnect is a citizen-first web platform to easily report and track civic issues
        like potholes, obstructions, waste, faulty electric wires, signals, illegal parking, and more.
      </p>
      <ul>
        <li>Report issues via category, description, image, and location.</li>
        <li>View recent issues city-wide on an interactive dashboard map.</li>
        <li>Monitor your reports and get status updates.</li>
        <li>Accessible on mobile and desktop, with intuitive dark UI.</li>
      </ul>
      <p style={{ marginTop: 18, color: "var(--base-light)" }}>
        Together, let's keep our city safe, clean and thriving! 🚀
      </p>
    </div>
  );
}

// ----- MAIN APP CONTAINER -----

// PUBLIC_INTERFACE
function CivicConnectMain() {
  const [nav, setNav] = useState("Home");
  const [showForm, setShowForm] = useState(false);

  // Store all issues in-memory this session
  const [issues, setIssues] = useState([
    // Example issues:
    {
      category: "pothole",
      description: "Large pothole on MG Road causing traffic.",
      image: null,
      location: { lat: 12.972, lng: 77.594 },
      date: new Date(Date.now()-7200*1000).toISOString(),
      status: "submitted"
    },
    {
      category: "waste",
      description: "Garbage dumped near Market Street.",
      image: null,
      location: { lat: 12.968, lng: 77.601 },
      date: new Date(Date.now()-14400*1000).toISOString(),
      status: "in_progress"
    },
    {
      category: "signal",
      description: "Signal not working at 5th Cross, Koramangala.",
      image: null,
      location: { lat: 12.935, lng: 77.622 },
      date: new Date(Date.now()-32000*1000).toISOString(),
      status: "resolved"
    },
  ]);


  // Dashboard filtering state
  const [filterCat, setFilterCat] = useState("");
  const [viewMode, setViewMode] = useState("map");

  // Filtering by category
  const filteredIssues = filterCat ? issues.filter(i=>i.category===filterCat) : issues;

  // Adding a new issue
  function handleIssueSubmit(issue) {
    setIssues([{...issue}, ...issues]);
    setShowForm(false);
    setNav("Home");
  }

  // Top-level navigation switching
  function handleNavSelect(route) {
    if (route === "Report") setShowForm(true);
    else setNav(route);
    if (route !== "Report") setShowForm(false);
  }

  return (
    <div className="app civicconnect-main" style={{background:"var(--base-dark)"}}>
      <CivicNavBar onNavSelect={handleNavSelect} selected={nav} />
      <main style={{paddingTop:80, minHeight:"92vh", background:"var(--base-dark)"}}>
        <div className="container">
          {showForm && (
            <div className="modal-bg">
              <div className="modal-content">
                <IssueReportForm
                  onSubmit={handleIssueSubmit}
                  onCancel={()=>setShowForm(false)}
                />
              </div>
            </div>
          )}

          {!showForm && nav === "Home" && (
            <section>
              <header className="hero" style={{paddingBottom:30}}>
                <div className="subtitle">Connecting Citizens and City</div>
                <h1 className="title">Civic<span style={{color:"var(--base-light)"}}>Connect</span></h1>
                <div className="description" style={{marginTop:12}}>
                  Report civic issues, track progress, and keep your city moving forward.<br />
                  Quick, accountable, and transparent.
                </div>
                <button className="btn btn-large" style={{background:"var(--base-light)", color:"#181818"}} onClick={()=>setShowForm(true)}>
                  Report an Issue
                </button>
              </header>
              <IssueDashboard
                issues={filteredIssues}
                filterCat={filterCat}
                setFilterCat={setFilterCat}
                viewMode={viewMode}
                setViewMode={setViewMode}
              />
              <section style={{margin: "48px 0"}}>
                <div style={{fontWeight:600, fontSize:"1.3rem", marginBottom:12, color: "var(--base-light)"}}>Issue Categories</div>
                <div className="cc-category-list">
                  {ISSUE_CATEGORIES.map(cat=>(
                    <div key={cat.key} className="cat-list-item" style={{borderColor:cat.color, color:cat.color}}>
                      <div className="cat-icon">{cat.icon}</div>
                      <span>{cat.name}</span>
                    </div>
                  ))}
                </div>
              </section>
            </section>
          )}

          {nav==="My Reports" && !showForm && <MyReports issues={issues.slice(0, 6)} />}
          {nav==="About" && !showForm && <AboutSection />}
        </div>
      </main>
      <footer style={{
        textAlign:"center",
        padding:"24px 0 10px 0",
        color:"var(--text-secondary)",
        fontSize:"1rem",
        marginTop:"30px",
        letterSpacing:"1px",
        background: "#181c2c"
      }}>
        &copy; {new Date().getFullYear()} CivicConnect. All Rights Reserved.
      </footer>
    </div>
  );
}

// ----- ROOT APP -----

// PUBLIC_INTERFACE
function App() {
  return <CivicConnectMain />;
}

export default App;
