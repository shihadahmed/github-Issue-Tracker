### 1️⃣ What is the difference between `var`, `let`, and `const`?

**Answer:** Think of these as boxes where you store your stuff (data).

* **`var`**: The **"old, broken box."** 📦  
    It’s messy because if you change something inside it, it might accidentally change things in other parts of your code. You can also name two different boxes the same thing, which is super confusing!
    
* **`let`**: The **"smart box."** 🧠  
    Use this if you know the value inside will change later—like a game score or a search query. It stays exactly where you put it.
    
* **`const`**: The **"locked box."** 🔒  
    Once you put something in here, you can’t change it. Use this for things like your birthday (**06.03.1998**) or a fixed API URL.

---

### 2️⃣ What is the spread operator (`...`)?

**Answer:** The spread operator is represented by three dots `...`. It functions like a universal **"copy-all"** tool for data structures.

> 💡 **The Concept:** When there is a list of items (an array) and those items need to be included into a new list, the `...` operator is used. It "spreads" the individual elements of the existing array into the new one, eliminating the need to type each item manually.



**Example:**
```javascript
const originalArray = [10, 20, 30];
const combinedArray = [...originalArray, 40, 50]; 

// Resulting array: [10, 20, 30, 40, 50]
``` 

---

### 3️⃣ What is the difference between `map()`, `filter()`, and `forEach()`?

**Answer:** These are array methods used to process lists of data. To understand their differences, they can be categorized by their specific roles:

* **`forEach()` (The Visitor):** It visits every item in the list and performs a specific task (such as `console.log` or updating a variable). It **does not return** anything new; its purpose is simply to execute an action for each element.

* **`map()` (The Transformer):** It takes an existing list, applies a change to every single item (for example, converting titles to uppercase), and **returns a brand-new list** with the modified data. The original list remains unchanged.

* **`filter()` (The Bouncer):** It checks each item against a specific condition (such as "only keep High Priority items"). It **returns a new, shorter list** containing only the items that meet that condition.



**Quick Comparison:**

| Method | Returns a New List? | Typical Use Case |
| :--- | :--- | :--- |
| **forEach** | No | Printing data or saving to a database. |
| **map** | Yes | Formatting data for display (e.g., creating HTML cards). |
| **filter** | Yes | Searching or removing unwanted items from a view. |

---


4️⃣ What is an arrow function?
5️⃣ What are template literals?

---

## 🛠️ Technology Stack

- **HTML**
- **CSS** (Vanilla/Tailwind/DaisyUI)
- **JavaScript** (Vanilla)

---

## 🔑 Demo Credentials

```text
Username: admin
Password: admin123
```
