# 🛡️ CIS Benchmark Auditing Platform

A lightweight, file-based web application to **automate CIS compliance audits** across Linux and Windows systems. Designed for system administrators and security teams.

**🔗 Live Demo:** [https://audit-script-platform.vercel.app/login](https://audit-script-platform.vercel.app/login)  
*(Username: `admin@auditguardian.com`, Password: `password`)*

---

## 🌟 Features
- **File-Based Data Storage** (No database required)  
  - Users, devices, and logs stored in `JSON` files.  
- **Cross-Platform Script Execution**  
  - Bash (Linux) + PowerShell (Windows) scripts.  
- **Real-Time Audit Dashboard**  
  - Run CIS checks, view logs, and download reports (PDF/CSV).  
- **SSH/WinRM Integration**  
  - Securely connect to remote devices.  

---

## 🛠️ Tech Stack
| Component       | Technology               |
|-----------------|--------------------------|
| **Frontend**    | React.js + Ant Design    |
| **Backend**     | FastAPI (Python)         |
| **Data Storage**| JSON/YAML files          |
| **Scripts**     | Bash/PowerShell          |
| **Hosting**     | Vercel (Frontend)        |

---

## 📂 Project Structure
```bash
.
├── backend/
│   ├── data/                  # JSON files (users, devices, logs)
│   ├── scripts/               # CIS audit scripts (OS-specific)
│   └── app.py                 # FastAPI server
└── frontend/                  # React app (Vercel-hosted)
```

---

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/UnsettledAverage73/audit-script-platform.git
```

### 2. Set Up Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux/macOS | venv\Scripts\activate (Windows)
pip install -r requirements.txt  # Install FastAPI, paramiko, pywinrm
uvicorn app:app --reload  # Start backend (http://localhost:8000)
```

### 3. Set Up Frontend
```bash
cd ../frontend
npm install
npm start  # Runs at http://localhost:3000
```

---

## 🔒 Authentication
Default admin credentials (stored in `backend/data/users.json`):
```json
{
  "username": "admin",
  "password": "hashed_demo123",
  "role": "admin"
}
```

---

## 📸 Screenshots
| Login Page | Device Dashboard |
|------------|------------------|
| ![Login](https://via.placeholder.com/400x200?text=Login+Page) | ![Dashboard](https://via.placeholder.com/400x200?text=Device+Grid) |

---

## 📜 License
MIT License - See [LICENSE](LICENSE).

---

## 🙋 FAQ
**Q: How do I add a new device?**  
A: Navigate to `Devices > Add Device` and enter IP/credentials. Data saves to `backend/data/devices.json`.

**Q: Where are audit logs stored?**  
A: In `backend/data/audit_logs/` as `[IP]_[TIMESTAMP].json`.

**Q: How to add custom CIS scripts?**  
A: Drop `.sh` (Linux) or `.ps1` (Windows) files in `backend/scripts/[os]/`.

---

## 🔗 Links
- [CIS Benchmarks](https://www.cisecurity.org/cis-benchmarks)  
- [Vercel Deployment Guide](https://vercel.com/docs)  
```
