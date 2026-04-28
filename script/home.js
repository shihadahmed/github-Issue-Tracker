// 1. Elements Selection (Exact IDs form HTML)
const grid = document.getElementById('issuesGrid');
const totalCountDisplay = document.getElementById('totalCountDisplay');
const openCountDisplay = document.getElementById('openCount');
const closedCountDisplay = document.getElementById('closedCount');
const searchInput = document.getElementById('searchInput');
const issueModal = document.getElementById('issueModal');
const modalContent = document.getElementById('modalContent');

let allIssues = [];

// 2. Load Data from API
async function loadIssues() {
    if (!grid) return;
    grid.innerHTML = `<div class="col-span-full text-center py-20"><span class="loading loading-spinner loading-lg text-primary"></span></div>`;
    
    try {
        const response = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
        const result = await response.json();
        
        // Handling API response structure
        allIssues = Array.isArray(result) ? result : (result.data || []);

        if (Array.isArray(allIssues)) {
            displayCards(allIssues.slice(0, 20)); 
            updateSummary(allIssues);
        }
    } catch (err) {
        console.error("API Fetch Error:", err);
        grid.innerHTML = `<p class="col-span-full text-center text-red-500 font-bold">API Connection Error!</p>`;
    }
}

// 3. Exact Design Card Display 
function displayCards(issues) {
    grid.innerHTML = '';
    if (issues.length === 0) {
        grid.innerHTML = `<p class="col-span-full text-center text-slate-400 py-10">No issues found!</p>`;
        return;
    }

    issues.forEach(item => {
        const priority = (item.priority || item.Priority || 'low').toLowerCase();
        
        let pConfig = {
            borderColor: '#A855F7', // Low
            iconBg: 'bg-[#EEF2FF]',
            iconColor: 'text-[#A855F7]',
            iconClass: 'fa-regular fa-circle-check'
        };

        if (priority === 'high') {
            pConfig = {
                borderColor: '#00A96E', // High
                iconBg: 'bg-[#F0FDF4]',
                iconColor: 'text-[#00A96E]',
                iconClass: 'fa-regular fa-circle-check'
            };
        } else if (priority === 'medium') {
            pConfig = {
                borderColor: '#D97706', // Medium
                iconBg: 'bg-[#FFFBEB]',
                iconColor: 'text-[#D97706]',
                iconClass: 'fa-solid fa-circle-notch animate-spin-slow'
            };
        }

        const date = new Date(item.createdAt || item.CreatedAt || Date.now()).toLocaleDateString('en-US');

        // --- labels mapping logic start ---
        const labelsHTML = (item.labels || []).map(label => {
            const isBug = label.toLowerCase().includes('bug');
            const badgeColor = isBug ? 'border-rose-100 bg-rose-50 text-rose-500' : 'border-amber-100 bg-amber-50 text-amber-600';
            const icon = isBug ? 'fa-face-grimace' : 'fa-lightbulb';
            
            return `
                <span class="badge badge-outline ${badgeColor} text-[10px] font-bold p-3 gap-1.5 uppercase">
                    <i class="fa-regular ${icon} text-sm"></i> ${label}
                </span>
            `;
        }).join('');
        // --- labels mapping logic end ---
        const cardWrapper = document.createElement('div');
        cardWrapper.className = `card bg-white border border-slate-100 border-t-[6px] shadow-sm rounded-xl hover:shadow-md transition-all cursor-pointer`;
        cardWrapper.style.borderTopColor = pConfig.borderColor; 
        
        cardWrapper.onclick = () => showModalDetails(item);

        cardWrapper.innerHTML = `
            <div class="card-body p-6 gap-3">
                <div class="flex justify-between items-start mb-2">
                    <div class="w-10 h-10 rounded-full ${pConfig.iconBg} flex items-center justify-center">
                         <i class="${pConfig.iconClass} ${pConfig.iconColor} text-xl"></i>
                    </div>
                    <span class="${pConfig.iconBg} ${pConfig.iconColor} text-[11px] font-black px-5 py-2 rounded-full uppercase tracking-widest">
                        ${priority}
                    </span>
                </div>

                <h2 class="text-slate-800 text-lg font-extrabold leading-tight line-clamp-2 h-14">
                    ${item.title || "Untitled Issue"}
                </h2>
                <p class="text-slate-500 text-[14px] leading-relaxed line-clamp-2">
                    ${item.description || "No description provided."}
                </p>

                <div class="flex flex-wrap gap-2 mt-2">
                    ${labelsHTML.length > 0 ? labelsHTML : '<span class="text-slate-300 text-[10px]">No Labels</span>'}
                </div>

                <div class="pt-4 border-t border-slate-50 text-[11px] font-bold text-slate-400">
                    <p>#${item.id} by ${item.author || 'User'}</p>
                    <p>${date}</p>
                </div>
            </div>`;
        grid.appendChild(cardWrapper);
    });
}
// 4. Modal Display Function (Based on API Structure)
function showModalDetails(issue) {
    if (!issueModal || !modalContent) return;

    // API structure
    const title = issue.title || "No Title";
    const author = issue.author || "Unknown";
    const assignee = issue.assignee || "Unassigned";
    const priority = (issue.priority || "low").toLowerCase();
    const status = (issue.status || "open").toLowerCase();
    const description = issue.description || "No description provided.";
    const labels = issue.labels || [];
    
    // Dates formatting
    const createdAt = new Date(issue.createdAt || Date.now()).toLocaleDateString('en-US');
    const updatedAt = issue.updatedAt ? new Date(issue.updatedAt).toLocaleDateString('en-US') : null;

    // Status label logic
    const statusClass = status === 'closed' ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600';
    const statusText = status === 'closed' ? 'Closed' : 'Opened';

    // Priority color logic
    const priorityClass = priority === 'high' ? 'bg-[#EF4444]' : (priority === 'medium' ? 'bg-[#F59E0B]' : 'bg-[#4F46E5]');

    // Labels logic
    const labelsHTML = labels.map(label => {
        const isBug = label.toLowerCase().includes('bug');
        const badgeColor = isBug ? 'border-rose-100 bg-rose-50 text-rose-500' : 'border-amber-100 bg-amber-50 text-amber-600';
        const icon = isBug ? 'fa-face-grimace' : 'fa-lightbulb';

        return `
            <span class="badge badge-outline ${badgeColor} text-[11px] font-bold p-3.5 gap-1.5 uppercase">
                <i class="fa-regular ${icon} text-sm"></i> ${label}
            </span>
        `;
    }).join('');

    // Dynamic HTML Structure
    modalContent.innerHTML = `
        <div class="space-y-6">
            <h2 class="text-3xl font-black text-slate-800 leading-tight">${title}</h2>
            
            <div class="flex gap-4 items-center border-b pb-6 border-slate-100">
                <span class="badge ${statusClass} font-bold px-4 py-3 rounded-full uppercase text-[12px]">
                    ${statusText}
                </span>
                <span class="text-slate-500 text-sm font-bold">
                    Opened by ${author} • ${createdAt}  
                </span>
            </div>

            <div class="flex flex-wrap gap-2">
                ${labelsHTML}
            </div>

            <p class="text-slate-600 leading-relaxed text-lg">${description}</p>

            <div class="grid grid-cols-2 gap-8 pt-8 border-t border-slate-100">
                <div>
                    <p class="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">Assignee:</p>
                    <p class="text-lg font-black text-slate-800 flex items-center gap-2">
                        <i class="fa-regular fa-user-circle text-slate-300"></i> ${assignee}
                    </p>
                </div>
                <div>
                    <p class="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">Priority:</p>
                    <span class="badge text-white font-bold px-5 py-4 rounded-xl text-[12px] uppercase ${priorityClass}">
                        ${priority.toUpperCase()}
                    </span>
                </div>
            </div>
        </div>
    `;
    
    // Open Modal
    issueModal.showModal();
}

// 5. Update Summary
function updateSummary(list) {
    if (totalCountDisplay) totalCountDisplay.innerText = `${list.length} Issues`;
    if (openCountDisplay) openCountDisplay.innerText = `${list.filter(i => (i.status || i.Status || '').toLowerCase() === 'open').length} Open`;
    if (closedCountDisplay) closedCountDisplay.innerText = `${list.filter(i => (i.status || i.Status || '').toLowerCase() === 'closed').length} Closed`;
}

// 6. Filter Implementation (Updated with Dynamic Count)
const filterButtons = document.querySelectorAll('.join-item');

filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        filterButtons.forEach(btn => {
            btn.classList.remove('btn-primary', 'text-white', 'active-tab');
            btn.classList.add('btn-ghost');
        });
        e.target.classList.add('btn-primary', 'text-white', 'active-tab');
        e.target.classList.remove('btn-ghost');

        const filterValue = e.target.innerText.trim().toLowerCase();
        let filteredData = [];

        if (filterValue === 'all') {
            filteredData = allIssues;
        } else {
            filteredData = allIssues.filter(issue => 
                (issue.status || issue.Status || '').toLowerCase() === filterValue
            );
        }

        // Card update kora
        displayCards(filteredData.slice(0, 20));
        if (totalCountDisplay) {
            totalCountDisplay.innerText = `${filteredData.length} Issues`;
        }
    });
});

// 7. Search Implementation
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const searchedData = allIssues.filter(issue => {
            const title = (issue.title || issue.Title || '').toLowerCase();
            const description = (issue.description || issue.Description || '').toLowerCase();
            return title.includes(query) || description.includes(query);
        });

        // UI Update: Cards update & Total Count update
        displayCards(searchedData.slice(0, 20));

        if (totalCountDisplay) {
            totalCountDisplay.innerText = `${searchedData.length} Issues`;
        }
    });
}

// Initial Call
loadIssues();