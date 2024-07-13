
async function fetchUsers() {
  try {
    const response = await axios.get('http://localhost:3000/UserDetails'); 
    const users = response.data;
     
    const tableBody = document.querySelector('#usersTableBody');
    tableBody.innerHTML = '';

    users.forEach(user => {

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.profession}</td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="updateUser('${user._id}')">Update</button>
          <button class="btn btn-danger btn-sm" onclick="deleteUser('${user._id}')">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Error fetching users:', error);
   
  }
}

document.addEventListener('DOMContentLoaded', fetchUsers);


async function updateUser(userId) {
  try {
    const name = prompt('Enter new name:');
    const phone = prompt('Enter new phone:');
    const updateDetails = {name ,phone}
    if (name && phone) {
      await axios.put(`http://localhost:3000/Users/user/${userId}`, { name , phone });
      fetchUsers();
    }
  } catch (error) {
    console.error('Error updating user:', error);

  }
}

async function deleteUser(userId) {
  try {
    if (confirm('Are you sure you want to delete this user?')) {
      await axios.delete(`http://localhost:3000/DeleteUsers/user/${userId}`);
      fetchUsers();
    }
  } catch (error) {
    console.error('Error deleting user:', error);
 
  }
}

document.addEventListener('DOMContentLoaded', fetchUsers);
