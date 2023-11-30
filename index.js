
// Initialize the entries array from local storage or create a new one
let entries = JSON.parse(localStorage.getItem('entries')) || [];

function addEntry() {
  const date = document.getElementById("date").value;
  const liters = parseFloat(document.getElementById("liters").value);
  const amount = parseFloat(document.getElementById("amount").value);
  const totalAmount = liters * amount;

  // Create a new entry object
  const newEntry = {
    date: date,
    liters: liters,
    amount: amount,
    totalAmount: totalAmount.toFixed(2),
  };

  // Add the new entry to the entries array
  entries.push(newEntry);

  // Store the updated entries array in local storage
  localStorage.setItem('entries', JSON.stringify(entries));
  localStorage.setItem('totalSum', JSON.stringify(totalSum));


  // Display the entries in a table format
  displayEntries();
  
  // Clear the input fields
  document.getElementById("date").value = "";
  document.getElementById("liters").value = "";
  document.getElementById("amount").value = "";
}

function displayEntries() {
  const entryList = document.getElementById("entryList");
  entryList.innerHTML = ""; // Clear the existing entries
  
  let totalSum = 0;

  // Loop through the entries array and display them in a table
  entries.forEach((entry, index) => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${entry.date}</td>
      <td>${entry.liters} liters</td>
      <td>Rs ${entry.amount} per liter</td>
      <td>Total: Rs ${entry.totalAmount}</td>
    `;

    entryList.appendChild(newRow);

    // Update the total sum
    totalSum += parseFloat(entry.totalAmount);
  });

  // Display the total sum
  document.getElementById("totalSum").textContent = `Total Sum: Rs ${totalSum.toFixed(2)}`;
}

// Call the displayEntries function to initially load the entries from local storage
displayEntries();







  function deleteEntry(index) {
    // Remove the entry from the entries array by its index
    entries.splice(index, 1);

    // Store the updated entries array in local storage
    localStorage.setItem('entries', JSON.stringify(entries));

    // Display the updated entries
    displayEntries();
  }

  function displayEntries() {
    const entryList = document.getElementById("entryList");
    entryList.innerHTML = ""; // Clear the existing entries

    let totalSum = 0;

    // Loop through the entries array and display them in a table
    entries.forEach((entry, index) => {
      const newRow = document.createElement("li");
      newRow.innerHTML = `
        ${entry.date}: ${entry.liters} liters at Rs ${entry.amount} per liter - Total: Rs ${entry.totalAmount}
        <button onclick="deleteEntry(${index})">Delete</button>
      `;

      entryList.appendChild(newRow);

      // Update the total sum
      totalSum += parseFloat(entry.totalAmount);
    });

    // Display the total sum
    document.getElementById("totalSum").textContent = `Total Sum: Rs ${totalSum.toFixed(2)}`;
  }
  localStorage.setItem('totalSum', JSON.stringify(totalSum));
  // ... Rest of the JavaScript code ...

  function deleteEntry(index) {
    // Remove the entry from the entries array by its index
    entries.splice(index, 1);

    // Store the updated entries array in local storage
    localStorage.setItem('entries', JSON.stringify(entries));
    localStorage.setItem('totalSum', JSON.stringify(totalSum));


    // Display the updated entries
    displayEntries();
  }

  function displayEntries() {
    const entryList = document.getElementById("entryList");
    entryList.innerHTML = ""; // Clear the existing entries

    let totalSum = 0;

    // Loop through the entries array and display them in a table
    entries.forEach((entry, index) => {
      const newRow = document.createElement("li");
      newRow.innerHTML = `
        ${entry.date}: ${entry.liters} liters at Rs ${entry.amount} per liter - Total: Rs ${entry.totalAmount}
        <button class="delete-button" onclick="deleteEntry(${index})">Delete</button>
      `;

      entryList.appendChild(newRow);

      // Update the total sum
      totalSum += parseFloat(entry.totalAmount);
    });

    // Display the total sum
    document.getElementById("totalSum").textContent = `Total Sum: Rs ${totalSum.toFixed(2)}`;
  }
  function exportToCSV() {
    // Create a CSV string with the header
    let csvContent = "Date,Liters,Amount per Liter,Total Amount\n";
  
    // Loop through the entries array and add each entry to the CSV
    entries.forEach((entry) => {
      csvContent += `${entry.date},${entry.liters},${entry.amount},${entry.totalAmount}\n`;
    });
  
    // Create a Blob object with the CSV data
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  
    // Create a download link for the CSV file
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "milk_entries.csv"; // Specify the filename
  
    // Click the link to trigger the download
    link.click();
  }
  
  function displayEntries() {
    const entryList = document.getElementById("entryList");
    entryList.innerHTML = ""; // Clear the existing entries
  
    let totalSum = 0;
  
    // Loop through the entries array and display them in a list
    entries.forEach((entry, index) => {
      const newRow = document.createElement("li");
  
      // Format the date as "DD/MM/YYYY"
      const formattedDate = formatDate(entry.date);
  
      newRow.innerHTML = `
        ${formattedDate}: ${entry.liters} liters at Rs ${entry.amount} per liter - Total: Rs ${entry.totalAmount}
        <button class="delete-button" onclick="deleteEntry(${index})">Delete</button>
      `;
  
      entryList.appendChild(newRow);
  
      // Update the total sum
      totalSum += parseFloat(entry.totalAmount);
    });
  
    // Display the total sum
    document.getElementById("totalSum").textContent = `Total Sum: Rs ${totalSum.toFixed(2)}`;
  }
  
  function formatDate(rawDate) {
    const dateObj = new Date(rawDate);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  }
  function shareViaEmail() {
    const entryList = document.getElementById("entryList");
    const totalSumText = document.getElementById("totalSum").textContent;
  
    let shareText = "Milk Data Tracker Entries:\n\n";
  
    // Loop through the entries array and add each entry to the shareText
    entries.forEach((entry) => {
      shareText += `${entry.date}: ${entry.liters} liters at Rs ${entry.amount} per liter - Total: Rs ${entry.totalAmount}\n`;
    });
  
    shareText += "\n" + totalSumText;
  
    // Create a mailto link with the shareable text
    const mailtoLink = `mailto:?subject=Milk%20Data%20Tracker%20Entries&body=${encodeURIComponent(shareText)}`;
  
    // Open the user's email client with the mailto link
    window.location.href = mailtoLink;
  }
  
  function shareViaWhatsApp() {
    const entryList = document.getElementById("entryList");
    const totalSumText = document.getElementById("totalSum").textContent;
  
    let shareText = "Milk Data Tracker Entries:\n\n";
  
    // Loop through the entries array and add each entry to the shareText
    entries.forEach((entry) => {
      shareText += `${entry.date}: ${entry.liters} liters at Rs ${entry.amount} per liter - Total: Rs ${entry.totalAmount}\n`;
    });
  
    shareText += "\n" + totalSumText;
  
    // Create a WhatsApp share link with the shareable text
    const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
  
    // Open the WhatsApp share link in a new tab
    window.open(whatsappLink, "_blank");
  }

  function exportToExcel() {
    // Create a copy of entries with formatted dates
    const entriesWithFormattedDate = entries.map((entry) => {
      const formattedDate = formatDateForExcel(entry.date);
      return { ...entry, date: formattedDate };
    });
  
    const worksheet = XLSX.utils.json_to_sheet(entriesWithFormattedDate);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Entries");
    XLSX.writeFile(workbook, "milk_entries.xlsx");
  }
  
  function formatDateForExcel(rawDate) {
    const dateObj = new Date(rawDate);
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  }
  



