import Database from "better-sqlite3";

const db = new Database('./Data/database.sqlite');

db.prepare(`CREATE TABLE IF NOT EXISTS blogs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user TEXT,
    title TEXT,
    category TEXT,
    content TEXT,
    creationDate DATE TIME,
    modificationDate DATE TIME)`).run();

export const getBlogs = () => db.prepare(`SELECT * FROM blogs`).all();

export const getBlog = (id) => db.prepare(`SELECT * FROM blogs WHERE id = ?`).get(id);

export const saveBlog = (user, title, category, content, date) => db.
prepare(`INSERT INTO blogs (user, title, category, content, creationDate) VALUES (?,?,?,?,?)`).
run(user, title, category, content, date);

export const updateBlog = (id, user, title, category, content, creationDate, modificationDate) => db.
prepare(`UPDATE blogs SET user = ?, title = ?, category = ?, content = ?, creationDate = ?, modificationDate = ? WHERE id = ?`).
run(user, title, category, content, creationDate, modificationDate, id);

export const deleteBlog = (id) => db.prepare(`DELETE FROM blogs WHERE id = ?`).run(id);

const blogs = [
    {
      user: "sanyi",
      title: "JavaScript alapok",
      category: "programozás",
      content: "Ez a cikk bemutatja a JavaScript alapjait, mint a változók, ciklusok és függvények.",
      creationDate: "2025-05-20T10:30:00"
    },
    {
      user: "andi",
      title: "Egészséges reggelik",
      category: "életmód",
      content: "Öt egyszerű és tápláló reggeli recept, amit bárki elkészíthet.",
      creationDate: "2025-04-15T07:00:00"
    },
    {
      user: "bela",
      title: "Top 10 utazási célpont 2025-ben",
      category: "utazás",
      content: "Ebben a cikkben összegyűjtöttük a legizgalmasabb helyeket, ahová érdemes elutazni idén.",
      creationDate: "2025-05-01T12:00:00"
    },
    {
      user: "dora",
      title: "Hogyan kezdj el meditálni?",
      category: "önfejlesztés",
      content: "A meditáció alapjait és napi rutinba való beépítésének módját mutatjuk be.",
      creationDate: "2025-03-22T18:45:00"
    },
    {
      user: "zoli",
      title: "Webdesign trendek 2025",
      category: "technológia",
      content: "Felfedezzük az idei év legnépszerűbb webdesign irányzatait és inspirációit.",
      creationDate: "2025-05-10T15:30:00"
    },
    {
      user: "kata",
      title: "Kreatív írás kezdőknek",
      category: "írás",
      content: "Tippek és gyakorlatok, hogy könnyedén belevágj az írás világába.",
      creationDate: "2025-02-28T14:00:00"
    }
  ];

//for (const blog of blogs) saveBlog(blog.user, blog.title, blog.category,blog.content, blog.creationDate);