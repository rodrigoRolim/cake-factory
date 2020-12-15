db.createUser(
  {
    user: "root",
    pwd: "root",
    roles: [
      {
        role: "readWrite",
        db: "cake-factory"
      }
    ]
  }
)