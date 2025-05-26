const baseUrl = 'http://localhost:8080/blogs/';
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        alert('Hiba történt:', error);
    }
}

async function displayBlogs() {
    const data = await fetchData(baseUrl);
    const div = document.getElementById('table');

    let table = '<table>';
    table += `
        <tr>
            <th>#</th>
            <th>Felhasználó</th>
            <th>Cím</th>
            <th>Kategória</th>
            <th>Tartalom</th>
            <th>Létrehozva</th>
            <th>Módosítva</th>
            <th>Műveletek</th>
        </tr>`;

    let counter = 1;
    data.forEach(blog => {
        table += `
            <tr>
                <td>${counter}</td>
                <td class="user">${blog.user}</td>
                <td class="title">${blog.title}</td>
                <td>${blog.category}</td>
                <td class="content"><div class="scrollable">${blog.content}</div></td>
                <td>${formatDate(blog.creationDate)}</td>
                <td>${blog.modificationDate ? formatDate(blog.modificationDate) : '-'}</td>
                <td>
                    <button class="delete" onclick="confirmDelete('${blog.id}')" title="Törlés">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                    <button class="edit" onclick="editBlog('${blog.id}', '${blog.user}', '${blog.title}', '${blog.category}', \`${blog.content}\`)" title="Szerkesztés">
                        <i class="fas fa-edit"></i>
                    </button>
                </td>
            </tr>`;

        counter++;
    });

    table += '</table>';
    div.innerHTML = table;
}

async function createBlog() {
    const user = document.getElementById("user");
    const title = document.getElementById("title");
    const category = document.getElementById("category");
    const content = document.getElementById("content");

    const creationDate = new Date().toLocaleString('sv-SE').replace(' ', 'T');

    try {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user: user.value,
                title: title.value,
                category: category.value,
                content: content.value,
                creationDate
            })
        });

        if (response.ok) {
            displayBlogs();
        } else {
            alert('Hiba a blog létrehozásakor.');
        }
    } catch (error) {
        alert('Hiba: ' + error.message);
    }

    document.getElementById("blogForm").reset();
}

function editBlog(id, user, title, category, content) {
    document.getElementById("editId").value = id;
    document.getElementById("editUser").value = user;
    document.getElementById("editTitle").value = title;
    document.getElementById("editCategory").value = category;
    document.getElementById("editContent").value = content;

    document.getElementById("editForm").style.display = "block";
    document.getElementById("editTitleHeading").style.display = "block";
    document.getElementById("editForm").scrollIntoView({ behavior: 'smooth' });
}

async function updateBlog() {
    const id = document.getElementById("editId").value;
    const user = document.getElementById("editUser").value;
    const title = document.getElementById("editTitle").value;
    const category = document.getElementById("editCategory").value;
    const content = document.getElementById("editContent").value;
    const modificationDate = new Date().toLocaleString('sv-SE').replace(' ', 'T');

    const updatedBlog = { user, title, category, content, modificationDate };

    try {
        const response = await fetch(baseUrl + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedBlog)
        });

        if (response.ok) {
            document.getElementById("editForm").reset();
            document.getElementById("editForm").style.display = "none";
            document.getElementById("editTitleHeading").style.display = "none";
            displayBlogs();
        } else {
            alert("Hiba történt a szerkesztés során.");
        }
    } catch (error) {
        alert("Hiba történt: " + error.message);
    }
}

async function confirmDelete(id) {
    const confirmResult = confirm("Biztosan törölni akarja ezt a blogot?");
    if (!confirmResult) return;

    try {
        const response = await fetch(baseUrl + id, { method: 'DELETE' });
        if (response.ok) {
            displayBlogs();
        } else {
            alert('Hiba történt a törlés során.');
        }
    } catch (error) {
        alert('Hiba történt: ' + error.message);
    }
}


function toggleAddForm() {
    const formContainer = document.getElementById("addFormContainer");
    formContainer.style.display = formContainer.style.display === "none" ? "block" : "none";
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('hu-HU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

function cancelEdit() {
    document.getElementById("editForm").reset();
    document.getElementById("editForm").style.display = "none";
    document.getElementById("editTitleHeading").style.display = "none";
}

displayBlogs();