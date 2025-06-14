# Collaborative Real-Time Form Editor

##  Folder Structure

```
collab-form-editor/
├── backend/               # Node.js + Express + WebSocket server
│   └── server.js
├── frontend/              # React frontend
│   ├── public/
│   └── src/
│       ├── App.js
│       └── index.js
├── README.md
├── package.json (for backend if needed)
```

---

##  Setup & Run Instructions

### Prerequisites
- Node.js & npm installed
- Git installed

### 1. Clone the repository
```bash
git clone https://github.com/akshatagoyal/collab-form-editor.git
cd collab-form-editor
```

### 2. Setup Backend
```bash
cd backend
npm install
node server.js
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install
npm start
```

App runs on `http://localhost:3000` and connects to WebSocket server at `ws://localhost:3001`

---

##  Architecture & Design

- **Frontend**: React for dynamic UI updates, local state management.
- **Backend**: Node.js + Express with `ws` (WebSocket) library for real-time communication.
- **Communication**: WebSocket is used for two-way communication to sync form state across clients.
- **Data Handling**: In-memory JS object stores form responses. Each form has shared state.

---

##  Technologies Used

| Tech        | Reason                                     |
|-------------|--------------------------------------------|
| React       | Component-based UI & stateful rendering    |
| WebSocket   | Real-time two-way communication            |
| Express.js  | Lightweight Node backend                   |
| Node.js     | Server runtime                             |

---

##  Key Features & Edge Cases

- ✅ Admin creates forms with title, description, category fields
- ✅ Users can join via shared URL
- ✅ All users edit the same form collaboratively
- ✅ Live updates via WebSocket syncs changes instantly
- ✅ Basic field locking to avoid overwriting in conflict
- ✅ Admin vs User role (editable fields shown/disabled)

Edge Cases Handled:
-  Simultaneous edit attempts (field-level locking)
-  User disconnect/reconnect

---

##  API Docs (Postman)

### `GET /`
> Used for test endpoint.

### `WebSocket Messages`

| Event         | Payload                            | Description                        |
|---------------|-------------------------------------|------------------------------------|
| `join_form`   | `{ formId: "123" }`                | User joins a form                  |
| `update_data` | `{ field: "title", value: "abc" }` | Field update broadcast             |
| `lock_field`  | `{ field: "title" }`               | Lock a field during editing        |
| `unlock_field`| `{ field: "title" }`               | Unlock on blur/stop typing         |

---

##  Submission Summary
- ✅ GitHub: [collab-form-editor](https://github.com/akshatagoyal/collab-form-editor)
- ✅ Folder structure maintained
- ✅ Real-time sync with WebSocket
- ✅ Admin/user distinction
- ✅ README included
- 🔄 Postman JSON collection ready
- 🟢 Deployment pending (optional)
- 🟢 Video walkthrough pending (optional)

---
## 📮 Postman Collection

You can test the WebSocket API using the provided Postman collection.

- [Download collab-form-api.postman_collection.json](./postman/collab-form-api.postman_collection.json)


