// Create chart
const ctx = document.getElementById("myChart");

new Chart(ctx, {
    type: "line",
    data: {
        labels: [
            "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22"
        ],
        datasets: [
            {
                label: "Today",
                data: [
                    15, 21, 26, 28, 28.5, 28, 30, 44, 51, 42, 25, 19, 18, 22, 38, 46, 48, 46, 42, 38
                ],
                lineTension: 1 / 3,
                backgroundColor: "transparent",
                borderColor: "#284DFF",
                borderWidth: 2,
                pointRadius: 0.3,
                pointHoverRadius: 6,
                pointBackgroundColor: "#FFFFFF",
                pointBorderColor: "#3366FF"
            },
            {
                label: "Yesterday",
                data: [
                    33, 34, 31.4, 24, 22.2, 24.2, 30, 32.5, 33, 31.5, 27, 22, 17.9, 17.5, 26, 42, 34, 30, 31.5, 35
                ],
                lineTension: 1 / 3,
                backgroundColor: "transparent",
                borderColor: "#E4E5EF",
                borderWidth: 2,
                pointRadius: 0.3,
                pointHoverRadius: 6,
                pointBackgroundColor: "#FFFFFF",
                pointBorderColor: "#E4E5EF"
            }
        ],
    },
    options: {
        scales: {
            x: {
                grid: {
                    drawOnChartArea: false,
                    drawTicks: true
                }
            },
            y: {
                position: "right",
                suggestedMin: 0,
                suggestedMax: 60,
                grid: {
                    drawBorder: false,
                }
            }
        },
        plugins: {
            legend: {
                align: "end",
                labels: {
                    usePointStyle: true,
                    pointStyle: "line",
                    boxWidth: 25,
                    boxHeight: 40,
                    padding: 10
                },
            },
            tooltip: {
                enabled: true,
                backgroundColor: "#fff",
                titleColor: "#000",
                bodyColor: "#000",
                borderColor: "#e5e7eb",
                borderWidth: 1,
                titleFont: { size: 12, weight: "600" },
                bodyFont: { size: 12 },
                displayColors: false,
                padding: 8,
            }
        }
    }
})

// Create the li HTML element in Sidebar Menu
function createSidebarMenuItem(dataItem) {
    const newListItem = document.createElement('li');
    newListItem.className = 'nav-item';
    // If active item
    if (dataItem.active) {
        newListItem.classList.add('bg-light', 'border-start', 'border-3');
        newListItem.style.setProperty('--bs-bg-opacity', '.05');
    }
    const linkClass = dataItem.active
        ? 'nav-link d-flex align-items-center gap-2 active'
        : 'nav-link d-flex align-items-center gap-2 text-secondary';
    newListItem.innerHTML = `
        <a class="${linkClass}" href="${dataItem.url}" aria-current="page">
            ${dataItem.icon}
            ${dataItem.label}
        </a>
    `;
    return newListItem;
}

// async/await
async function getData() {
    try {
        const moduleData = await fetch('/assets/data/content.json');
        const data = await moduleData.json();
        // Unresolved Tickets Module
        // Module Title
        const unresolvedTitle = document.querySelector('#unresolvedTitle');
        unresolvedTitle.innerHTML = data.unresolvedTicketModule.title;
        // Module Action
        const unresolvedAction = document.querySelector('#unresolvedAction');
        unresolvedAction.innerHTML = data.unresolvedTicketModule.action;
        // Module Label
        const unresolvedLabel = document.querySelector('#unresolvedLabel');
        unresolvedLabel.innerHTML = data.unresolvedTicketModule.label;
        // Module Label Details
        const unresolvedLabelDetails = document.querySelector('#unresolvedLabelDetails');
        unresolvedLabelDetails.innerHTML = data.unresolvedTicketModule.labelDetails;
        // Module List
        const unresolvedList = document.querySelector('#unresolvedList');
        data.unresolvedTicketModule.listInfo.forEach(item => {
            const newListItem = document.createElement('li');
            newListItem.className = 'list-group-item d-flex justify-content-between align-items-center px-0';
            newListItem.innerHTML = `
                <span>${item.name}</span>
                <strong class="small fw-medium text-body-tertiary">${item.count}</strong>
            `;
            unresolvedList.appendChild(newListItem);
        });

        // Tasks Module
        // Module Title
        const tasksTitle = document.querySelector('#tasksTitle');
        tasksTitle.innerHTML = data.tasksModule.title;
        // Module Action
        const tasksViewDetails = document.querySelector('#tasksAction');
        tasksViewDetails.innerHTML = data.tasksModule.action;
        // Module Section Label
        const tasksSectionLabel = document.querySelector('#tasksSectionLabel');
        tasksSectionLabel.innerHTML = data.tasksModule.sectionLabel;
        // Module List
        const tasksList = document.querySelector('#tasksList');
        data.tasksModule.tasksList.forEach(item => {
            const newListItem = document.createElement('li');
            newListItem.className = "list-group-item d-flex align-items-center justify-content-between px-0";
            // Create New Task row
            if (item.type === "new_task") {
                newListItem.innerHTML = `
                    <div class="d-flex align-items-center gap-2">
                        <input type="text" class="form-control form-control-sm border-0 px-0" placeholder="${item.placeholder}">
                    </div>
                    <button class="custom-btn btn btn-sm p-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-${item.buttonIcon}" viewBox="0 0 16 16">
                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0"/>
                        </svg>
                    </button>
                `;
            }
            // Normal Task row
            else if (item.type === "task") {
                // Badges
                let badgeClass = "badge";
                if (item.badge.style === "warning") badgeClass += " bg-warning text-white";
                else if (item.badge.style === "success") badgeClass += " bg-success";
                else if (item.badge.style === "secondary") badgeClass += " bg-body-secondary text-body-secondary";
                newListItem.innerHTML = `
                    <div class="d-flex align-items-center gap-2">
                        <input class="custom-form-check form-check-input mt-0" type="checkbox" ${item.checked ? "checked" : ""} aria-label="${item.label}">
                        <span>${item.label}</span>
                    </div>
                    <span class="${badgeClass}">${item.badge.text}</span>
                `;
            }
            tasksList.appendChild(newListItem);
        });

        // Overview Module
        // Module Title
        const overviewTitle = document.querySelector('#overviewTitle');
        overviewTitle.innerHTML = data.overviewModule.title;
        // Module List
        const overviewList = document.querySelector('#overviewList');
        data.overviewModule.overviewList.forEach(item => {
            const newListItem = document.createElement('li');
            newListItem.className = "col-12 col-sm-6 col-lg-3";
            newListItem.innerHTML = `
                <div class="custom-status-card card text-center p-4 border">
                    <h2 class="h6 card-title mb-0">${item.label}</h2>
                    <p class="card-text fs-2 fw-medium">${item.value}</p>
                </div>
            `;
            overviewList.appendChild(newListItem);
        });

        // Sidebar Menu  - first 6
        const sidebarMenu1 = document.querySelector('#sidebarMenu1');
        const sidebarItems1 = data.sidebarMenu.items;

        sidebarItems1.forEach(item => {
            const newListItem = createSidebarMenuItem(item);
            sidebarMenu1.appendChild(newListItem);
        });

        // Sidebar Menu - last 2
        const sidebarMenu2 = document.querySelector('#sidebarMenu2');
        const sidebarItems2 = data.sidebarMenu2.items;

        sidebarItems2.forEach(item => {
            const newListItem = createSidebarMenuItem(item);
            sidebarMenu2.appendChild(newListItem);
        });
    } catch (error) {
        console.warn(`Error getting data: ${error}`);
    }
}
getData();