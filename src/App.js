import React, { useEffect, useState } from "react";
import "./App.css";

const defaultAircraft = [
  {
    id: "AC001",
    model: "Boeing 737-800",
    type: "Passenger",
    year: "2021",
    price: "48000000",
    status: "Available",
  },
  {
    id: "AC002",
    model: "Airbus A320",
    type: "Passenger",
    year: "2020",
    price: "42000000",
    status: "Sold",
  },
  {
    id: "AC003",
    model: "Cessna Citation X",
    type: "Business Jet",
    year: "2022",
    price: "22000000",
    status: "Available",
  },
  {
    id: "AC004",
    model: "Gulfstream G650",
    type: "Business Jet",
    year: "2023",
    price: "65000000",
    status: "Maintenance",
  },
];

const defaultCustomers = [
  {
    id: "C001",
    name: "Tata Aviation",
    email: "aviation@tata.com",
    phone: "9876543210",
    city: "Mumbai",
    type: "Company",
  },
];

const defaultSuppliers = [
  {
    id: "S001",
    name: "Boeing Supplier India",
    email: "supplier@boeing.com",
    phone: "9876500000",
    city: "Mumbai",
  },
];

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [page, setPage] = useState("Dashboard");

  const [aircraft, setAircraft] = useState(
    JSON.parse(localStorage.getItem("vel_aircraft")) || defaultAircraft
  );

  const [customers, setCustomers] = useState(
    JSON.parse(localStorage.getItem("vel_customers")) || defaultCustomers
  );

  const [suppliers, setSuppliers] = useState(
    JSON.parse(localStorage.getItem("vel_suppliers")) || defaultSuppliers
  );

  const [purchases, setPurchases] = useState(
    JSON.parse(localStorage.getItem("vel_purchases")) || []
  );

  const [sales, setSales] = useState(
    JSON.parse(localStorage.getItem("vel_sales")) || []
  );

  const [maintenance, setMaintenance] = useState(
    JSON.parse(localStorage.getItem("vel_maintenance")) || []
  );

  const [checkLogs, setCheckLogs] = useState(
    JSON.parse(localStorage.getItem("vel_checklogs")) || []
  );

  useEffect(() => {
    localStorage.setItem("vel_aircraft", JSON.stringify(aircraft));
  }, [aircraft]);

  useEffect(() => {
    localStorage.setItem("vel_customers", JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem("vel_suppliers", JSON.stringify(suppliers));
  }, [suppliers]);

  useEffect(() => {
    localStorage.setItem("vel_purchases", JSON.stringify(purchases));
  }, [purchases]);

  useEffect(() => {
    localStorage.setItem("vel_sales", JSON.stringify(sales));
  }, [sales]);

  useEffect(() => {
    localStorage.setItem("vel_maintenance", JSON.stringify(maintenance));
  }, [maintenance]);

  useEffect(() => {
    localStorage.setItem("vel_checklogs", JSON.stringify(checkLogs));
  }, [checkLogs]);

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div className="app">
      <Sidebar
        page={page}
        setPage={setPage}
        logout={() => setLoggedIn(false)}
      />

      <div className="main">
        <header>
          <div>
            <h1>VEL Aerospace</h1>
            <p>Aircraft Management System</p>
          </div>

          <div className="user">
            👤 Admin <span>● Online</span>
          </div>
        </header>

        <main>
          {page === "Dashboard" && (
            <Dashboard
              aircraft={aircraft}
              customers={customers}
              suppliers={suppliers}
              purchases={purchases}
              sales={sales}
              maintenance={maintenance}
              checkLogs={checkLogs}
            />
          )}

          {page === "Aircraft" && (
            <AircraftPage
              aircraft={aircraft}
              setAircraft={setAircraft}
            />
          )}

          {page === "Customers" && (
            <CustomersPage
              customers={customers}
              setCustomers={setCustomers}
            />
          )}

          {page === "Suppliers" && (
            <SuppliersPage
              suppliers={suppliers}
              setSuppliers={setSuppliers}
            />
          )}

          {page === "Aircraft Purchase" && (
            <PurchasePage
              purchases={purchases}
              setPurchases={setPurchases}
              aircraft={aircraft}
              suppliers={suppliers}
            />
          )}

          {page === "Aircraft Sales" && (
            <SalesPage
              sales={sales}
              setSales={setSales}
              aircraft={aircraft}
              customers={customers}
            />
          )}

          {page === "Maintenance" && (
            <MaintenancePage
              maintenance={maintenance}
              setMaintenance={setMaintenance}
              aircraft={aircraft}
            />
          )}

          {page === "Check In / Check Out" && (
            <CheckPage
              checkLogs={checkLogs}
              setCheckLogs={setCheckLogs}
              aircraft={aircraft}
            />
          )}
        </main>
      </div>
    </div>
  );
}

/* ================= LOGIN ================= */

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function login() {
    if (username === "admin" && password === "vel123") {
      onLogin();
    } else {
      alert("Invalid login.\nUsername: admin\nPassword: vel123");
    }
  }

  return (
    <div className="login-screen">
      <div className="login-box">
        <div className="logo-circle">✈</div>
        <h1>VEL Aerospace</h1>
        <p>Aircraft Management System</p>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={login}>Login</button>

        <small>Demo: admin / vel123</small>
      </div>
    </div>
  );
}

/* ================= SIDEBAR ================= */

function Sidebar({ page, setPage, logout }) {
  const menu = [
    ["📊", "Dashboard"],
    ["✈️", "Aircraft"],
    ["👥", "Customers"],
    ["🏭", "Suppliers"],
    ["🛒", "Aircraft Purchase"],
    ["💰", "Aircraft Sales"],
    ["🔧", "Maintenance"],
    ["🛫", "Check In / Check Out"],
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">✈</div>
        <div>
          <strong>VEL</strong>
          <small>AEROSPACE</small>
        </div>
      </div>

      <nav>
        {menu.map(([icon, name]) => (
          <button
            key={name}
            className={page === name ? "active" : ""}
            onClick={() => setPage(name)}
          >
            <span>{icon}</span>
            {name}
          </button>
        ))}
      </nav>

      <button className="logout" onClick={logout}>
        🚪 Logout
      </button>
    </aside>
  );
}

/* ================= DASHBOARD ================= */

function Dashboard({
  aircraft,
  customers,
  suppliers,
  purchases,
  sales,
  maintenance,
  checkLogs,
}) {
  const available = aircraft.filter((a) => a.status === "Available").length;

  return (
    <section>
      <PageTitle
        title="Dashboard"
        subtitle="VEL Aerospace overview"
      />

      <div className="cards">
        <Stat title="Total Aircraft" value={aircraft.length} icon="✈️" />
        <Stat title="Available Aircraft" value={available} icon="🟢" />
        <Stat title="Customers" value={customers.length} icon="👥" />
        <Stat title="Suppliers" value={suppliers.length} icon="🏭" />
        <Stat title="Purchases" value={purchases.length} icon="🛒" />
        <Stat title="Sales" value={sales.length} icon="💰" />
        <Stat title="Maintenance" value={maintenance.length} icon="🔧" />
        <Stat title="Check Records" value={checkLogs.length} icon="🛫" />
      </div>

      <div className="welcome">
        <h2>Welcome to VEL Aerospace</h2>
        <p>
          Use the menu on the left to add and manage aircraft,
          customers, suppliers, purchases, sales and maintenance records.
        </p>
      </div>
    </section>
  );
}

function Stat({ title, value, icon }) {
  return (
    <div className="stat">
      <div className="stat-icon">{icon}</div>
      <div>
        <h3>{value}</h3>
        <p>{title}</p>
      </div>
    </div>
  );
}

/* ================= AIRCRAFT ================= */

function AircraftPage({ aircraft, setAircraft }) {
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    id: "",
    model: "",
    type: "Passenger",
    year: "",
    price: "",
    status: "Available",
  });

  function addAircraft(e) {
    e.preventDefault();

    if (!form.id || !form.model || !form.year || !form.price) {
      alert("Please fill all required fields.");
      return;
    }

    if (aircraft.some((a) => a.id === form.id)) {
      alert("Aircraft ID already exists.");
      return;
    }

    setAircraft([...aircraft, form]);

    setForm({
      id: "",
      model: "",
      type: "Passenger",
      year: "",
      price: "",
      status: "Available",
    });

    setShowForm(false);
    alert("Aircraft added successfully!");
  }

  function deleteAircraft(id) {
    if (window.confirm("Delete this aircraft?")) {
      setAircraft(aircraft.filter((a) => a.id !== id));
    }
  }

  const filtered = aircraft.filter(
    (a) =>
      a.id.toLowerCase().includes(search.toLowerCase()) ||
      a.model.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section>
      <PageTitle
        title="Aircraft"
        subtitle="Manage VEL aircraft inventory"
      />

      <div className="toolbar">
        <input
          className="search"
          placeholder="🔎 Search aircraft..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="primary" onClick={() => setShowForm(!showForm)}>
          + Add Aircraft
        </button>
      </div>

      {showForm && (
        <form className="form-card" onSubmit={addAircraft}>
          <h2>Add New Aircraft</h2>

          <div className="form-grid">
            <input
              placeholder="Aircraft ID *"
              value={form.id}
              onChange={(e) =>
                setForm({ ...form, id: e.target.value })
              }
            />

            <input
              placeholder="Model *"
              value={form.model}
              onChange={(e) =>
                setForm({ ...form, model: e.target.value })
              }
            />

            <select
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value })
              }
            >
              <option>Passenger</option>
              <option>Business Jet</option>
              <option>Cargo</option>
              <option>Helicopter</option>
            </select>

            <input
              type="number"
              placeholder="Year *"
              value={form.year}
              onChange={(e) =>
                setForm({ ...form, year: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Price *"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
            />

            <select
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value })
              }
            >
              <option>Available</option>
              <option>Sold</option>
              <option>Maintenance</option>
            </select>
          </div>

          <button className="primary" type="submit">
            Save Aircraft
          </button>

          <button
            type="button"
            className="secondary"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
        </form>
      )}

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Aircraft ID</th>
              <th>Model</th>
              <th>Type</th>
              <th>Year</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.model}</td>
                <td>{a.type}</td>
                <td>{a.year}</td>
                <td>₹{Number(a.price).toLocaleString("en-IN")}</td>
                <td>
                  <span className={`badge ${a.status.toLowerCase()}`}>
                    {a.status}
                  </span>
                </td>
                <td>
                  <button
                    className="delete"
                    onClick={() => deleteAircraft(a.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ================= CUSTOMERS ================= */

function CustomersPage({ customers, setCustomers }) {
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    city: "",
    type: "Individual",
  });

  function addCustomer(e) {
    e.preventDefault();

    if (!form.id || !form.name || !form.email) {
      alert("Customer ID, name and email are required.");
      return;
    }

    if (customers.some((c) => c.id === form.id)) {
      alert("Customer ID already exists.");
      return;
    }

    setCustomers([...customers, form]);

    setForm({
      id: "",
      name: "",
      email: "",
      phone: "",
      city: "",
      type: "Individual",
    });

    setShowForm(false);
  }

  return (
    <section>
      <PageTitle title="Customers" subtitle="Manage VEL customers" />

      <div className="toolbar">
        <div></div>
        <button className="primary" onClick={() => setShowForm(!showForm)}>
          + Add Customer
        </button>
      </div>

      {showForm && (
        <form className="form-card" onSubmit={addCustomer}>
          <h2>Add Customer</h2>

          <div className="form-grid">
            <input
              placeholder="Customer ID *"
              value={form.id}
              onChange={(e) => setForm({ ...form, id: e.target.value })}
            />

            <input
              placeholder="Customer Name *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              placeholder="Email *"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <input
              placeholder="City"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />

            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option>Individual</option>
              <option>Company</option>
              <option>Government</option>
            </select>
          </div>

          <button className="primary">Save Customer</button>
        </form>
      )}

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>City</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>{c.city}</td>
                <td>{c.type}</td>
                <td>
                  <button
                    className="delete"
                    onClick={() =>
                      setCustomers(customers.filter((x) => x.id !== c.id))
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ================= SUPPLIERS ================= */

function SuppliersPage({ suppliers, setSuppliers }) {
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    city: "",
  });

  function addSupplier(e) {
    e.preventDefault();

    if (!form.id || !form.name) {
      alert("Supplier ID and name are required.");
      return;
    }

    if (suppliers.some((s) => s.id === form.id)) {
      alert("Supplier ID already exists.");
      return;
    }

    setSuppliers([...suppliers, form]);

    setForm({
      id: "",
      name: "",
      email: "",
      phone: "",
      city: "",
    });

    setShowForm(false);
  }

  return (
    <section>
      <PageTitle title="Suppliers" subtitle="Manage aircraft suppliers" />

      <div className="toolbar">
        <div></div>
        <button className="primary" onClick={() => setShowForm(!showForm)}>
          + Add Supplier
        </button>
      </div>

      {showForm && (
        <form className="form-card" onSubmit={addSupplier}>
          <h2>Add Supplier</h2>

          <div className="form-grid">
            <input
              placeholder="Supplier ID *"
              value={form.id}
              onChange={(e) => setForm({ ...form, id: e.target.value })}
            />

            <input
              placeholder="Supplier Name *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <input
              placeholder="City"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
          </div>

          <button className="primary">Save Supplier</button>
        </form>
      )}

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>City</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {suppliers.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.phone}</td>
                <td>{s.city}</td>
                <td>
                  <button
                    className="delete"
                    onClick={() =>
                      setSuppliers(suppliers.filter((x) => x.id !== s.id))
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ================= PURCHASE ================= */

function PurchasePage({
  purchases,
  setPurchases,
  aircraft,
  suppliers,
}) {
  const [form, setForm] = useState({
    id: "",
    aircraftId: "",
    supplierId: "",
    date: "",
    amount: "",
  });

  function addPurchase(e) {
    e.preventDefault();

    if (
      !form.id ||
      !form.aircraftId ||
      !form.supplierId ||
      !form.date ||
      !form.amount
    ) {
      alert("Please fill all fields.");
      return;
    }

    setPurchases([...purchases, form]);

    setForm({
      id: "",
      aircraftId: "",
      supplierId: "",
      date: "",
      amount: "",
    });

    alert("Purchase recorded!");
  }

  return (
    <section>
      <PageTitle
        title="Aircraft Purchase"
        subtitle="Record aircraft purchases"
      />

      <form className="form-card" onSubmit={addPurchase}>
        <h2>Record Purchase</h2>

        <div className="form-grid">
          <input
            placeholder="Purchase ID"
            value={form.id}
            onChange={(e) => setForm({ ...form, id: e.target.value })}
          />

          <select
            value={form.aircraftId}
            onChange={(e) =>
              setForm({ ...form, aircraftId: e.target.value })
            }
          >
            <option value="">Select Aircraft</option>
            {aircraft.map((a) => (
              <option key={a.id} value={a.id}>
                {a.id} - {a.model}
              </option>
            ))}
          </select>

          <select
            value={form.supplierId}
            onChange={(e) =>
              setForm({ ...form, supplierId: e.target.value })
            }
          >
            <option value="">Select Supplier</option>
            {suppliers.map((s) => (
              <option key={s.id} value={s.id}>
                {s.id} - {s.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />

          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />
        </div>

        <button className="primary">Record Purchase</button>
      </form>

      <RecordTable
        records={purchases}
        columns={["id", "aircraftId", "supplierId", "date", "amount"]}
        setRecords={setPurchases}
      />
    </section>
  );
}

/* ================= SALES ================= */

function SalesPage({ sales, setSales, aircraft, customers }) {
  const [form, setForm] = useState({
    id: "",
    aircraftId: "",
    customerId: "",
    date: "",
    amount: "",
  });

  function addSale(e) {
    e.preventDefault();

    if (
      !form.id ||
      !form.aircraftId ||
      !form.customerId ||
      !form.date ||
      !form.amount
    ) {
      alert("Please fill all fields.");
      return;
    }

    setSales([...sales, form]);

    setForm({
      id: "",
      aircraftId: "",
      customerId: "",
      date: "",
      amount: "",
    });

    alert("Sale recorded!");
  }

  return (
    <section>
      <PageTitle
        title="Aircraft Sales"
        subtitle="Record aircraft sales"
      />

      <form className="form-card" onSubmit={addSale}>
        <h2>Record Sale</h2>

        <div className="form-grid">
          <input
            placeholder="Sale ID"
            value={form.id}
            onChange={(e) => setForm({ ...form, id: e.target.value })}
          />

          <select
            value={form.aircraftId}
            onChange={(e) =>
              setForm({ ...form, aircraftId: e.target.value })
            }
          >
            <option value="">Select Aircraft</option>
            {aircraft.map((a) => (
              <option key={a.id} value={a.id}>
                {a.id} - {a.model}
              </option>
            ))}
          </select>

          <select
            value={form.customerId}
            onChange={(e) =>
              setForm({ ...form, customerId: e.target.value })
            }
          >
            <option value="">Select Customer</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.id} - {c.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />

          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />
        </div>

        <button className="primary">Record Sale</button>
      </form>

      <RecordTable
        records={sales}
        columns={["id", "aircraftId", "customerId", "date", "amount"]}
        setRecords={setSales}
      />
    </section>
  );
}

/* ================= MAINTENANCE ================= */

function MaintenancePage({
  maintenance,
  setMaintenance,
  aircraft,
}) {
  const [form, setForm] = useState({
    id: "",
    aircraftId: "",
    date: "",
    description: "",
    cost: "",
    status: "Scheduled",
  });

  function addMaintenance(e) {
    e.preventDefault();

    if (!form.id || !form.aircraftId || !form.date || !form.description) {
      alert("Please fill all required fields.");
      return;
    }

    setMaintenance([...maintenance, form]);

    setForm({
      id: "",
      aircraftId: "",
      date: "",
      description: "",
      cost: "",
      status: "Scheduled",
    });

    alert("Maintenance record added!");
  }

  return (
    <section>
      <PageTitle
        title="Maintenance"
        subtitle="Record aircraft maintenance"
      />

      <form className="form-card" onSubmit={addMaintenance}>
        <h2>Add Maintenance Record</h2>

        <div className="form-grid">
          <input
            placeholder="Maintenance ID"
            value={form.id}
            onChange={(e) => setForm({ ...form, id: e.target.value })}
          />

          <select
            value={form.aircraftId}
            onChange={(e) =>
              setForm({ ...form, aircraftId: e.target.value })
            }
          >
            <option value="">Select Aircraft</option>
            {aircraft.map((a) => (
              <option key={a.id} value={a.id}>
                {a.id} - {a.model}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />

          <input
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Cost"
            value={form.cost}
            onChange={(e) => setForm({ ...form, cost: e.target.value })}
          />

          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option>Scheduled</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>

        <button className="primary">Save Maintenance</button>
      </form>

      <RecordTable
        records={maintenance}
        columns={[
          "id",
          "aircraftId",
          "date",
          "description",
          "cost",
          "status",
        ]}
        setRecords={setMaintenance}
      />
    </section>
  );
}

/* ================= CHECK IN / OUT ================= */

function CheckPage({ checkLogs, setCheckLogs, aircraft }) {
  const [form, setForm] = useState({
    id: "",
    aircraftId: "",
    type: "Check In",
    date: "",
    person: "",
    remarks: "",
  });

  function addLog(e) {
    e.preventDefault();

    if (!form.id || !form.aircraftId || !form.date || !form.person) {
      alert("Please fill all required fields.");
      return;
    }

    setCheckLogs([...checkLogs, form]);

    setForm({
      id: "",
      aircraftId: "",
      type: "Check In",
      date: "",
      person: "",
      remarks: "",
    });

    alert("Check record saved!");
  }

  return (
    <section>
      <PageTitle
        title="Check In / Check Out"
        subtitle="Record aircraft movement"
      />

      <form className="form-card" onSubmit={addLog}>
        <h2>Record Check In / Check Out</h2>

        <div className="form-grid">
          <input
            placeholder="Check ID"
            value={form.id}
            onChange={(e) => setForm({ ...form, id: e.target.value })}
          />

          <select
            value={form.aircraftId}
            onChange={(e) =>
              setForm({ ...form, aircraftId: e.target.value })
            }
          >
            <option value="">Select Aircraft</option>
            {aircraft.map((a) => (
              <option key={a.id} value={a.id}>
                {a.id} - {a.model}
              </option>
            ))}
          </select>

          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option>Check In</option>
            <option>Check Out</option>
          </select>

          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />

          <input
            placeholder="Employee / Person"
            value={form.person}
            onChange={(e) => setForm({ ...form, person: e.target.value })}
          />

          <input
            placeholder="Remarks"
            value={form.remarks}
            onChange={(e) => setForm({ ...form, remarks: e.target.value })}
          />
        </div>

        <button className="primary">Save Check Record</button>
      </form>

      <RecordTable
        records={checkLogs}
        columns={[
          "id",
          "aircraftId",
          "type",
          "date",
          "person",
          "remarks",
        ]}
        setRecords={setCheckLogs}
      />
    </section>
  );
}

/* ================= GENERIC TABLE ================= */

function RecordTable({ records, columns, setRecords }) {
  return (
    <div className="table-card">
      {records.length === 0 ? (
        <div className="empty">
          No records yet. Use the form above to add a record.
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column}>{formatTitle(column)}</th>
              ))}
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {records.map((record, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column}>
                    {column === "amount" || column === "cost"
                      ? `₹${Number(record[column] || 0).toLocaleString(
                          "en-IN"
                        )}`
                      : record[column]}
                  </td>
                ))}

                <td>
                  <button
                    className="delete"
                    onClick={() =>
                      setRecords(records.filter((_, i) => i !== index))
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function formatTitle(text) {
  return text
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (x) => x.toUpperCase());
}

/* ================= COMMON ================= */

function PageTitle({ title, subtitle }) {
  return (
    <div className="page-title">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
}

export default App;