// Admin Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (!localStorage.getItem('adminLoggedIn')) {
        window.location.href = 'admin-login.html';
        return;
    }

    // Sample data
    const jobRequestsData = [
        {
            id: 'JD001',
            position: 'Senior Full Stack Developer',
            department: 'Engineering',
            status: 'Completed',
            matchesFound: 3,
            created: '2024-01-10',
            experience: '5-8'
        },
        {
            id: 'JD002',
            position: 'Data Scientist',
            department: 'Data Science',
            status: 'In Progress',
            matchesFound: 2,
            created: '2024-01-12',
            experience: '2-5'
        },
        {
            id: 'JD003',
            position: 'DevOps Engineer',
            department: 'DevOps',
            status: 'In Progress',
            matchesFound: 1,
            created: '2024-01-14',
            experience: '2-5'
        },
        {
            id: 'JD004',
            position: 'Product Manager',
            department: 'Product',
            status: 'Completed',
            matchesFound: 3,
            created: '2024-01-08',
            experience: '5-8'
        },
        {
            id: 'JD005',
            position: 'UI/UX Designer',
            department: 'Product',
            status: 'Pending',
            matchesFound: 0,
            created: '2024-01-15',
            experience: '2-5'
        }
    ];

    const uploadHistoryData = [
        {
            fileName: 'senior_developer_profiles.csv',
            type: 'Profiles',
            size: '2.1 MB',
            uploadDate: '2024-01-15',
            status: 'Processed'
        },
        {
            fileName: 'Q1_job_descriptions.pdf',
            type: 'Job Descriptions',
            size: '856 KB',
            uploadDate: '2024-01-14',
            status: 'Processing'
        },
        {
            fileName: 'data_scientist_jd.docx',
            type: 'Job Descriptions',
            size: '124 KB',
            uploadDate: '2024-01-12',
            status: 'Processed'
        }
    ];

    // Navigation functions
    window.showSection = function(sectionName) {
        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.add('d-none');
        });
        
        // Show selected section
        document.getElementById(`${sectionName}-section`).classList.remove('d-none');
        
        // Update navigation
        document.querySelectorAll('.sidebar .nav-link').forEach(link => {
            link.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // Initialize section-specific content
        if (sectionName === 'job-requests') {
            populateJobRequestsTable();
        } else if (sectionName === 'uploads') {
            populateUploadHistory();
        } else if (sectionName === 'overview') {
            initializeCharts();
            populateActivityFeed();
        } else if (sectionName === 'analytics') {
            initializeAnalyticsCharts();
        }
    };

    // Populate job requests table
    function populateJobRequestsTable() {
        const tableBody = document.getElementById('jobRequestsTable');
        if (!tableBody) return;
        
        tableBody.innerHTML = '';
        
        jobRequestsData.forEach(request => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>${request.id}</strong></td>
                <td>${request.position}</td>
                <td>${request.department}</td>
                <td>
                    <span class="badge bg-${getStatusColor(request.status)}">${request.status}</span>
                </td>
                <td>
                    <span class="badge bg-info">${request.matchesFound}</span>
                </td>
                <td>${new Date(request.created).toLocaleDateString()}</td>
                <td>
                    <div class="btn-group btn-group-sm">
                        <button class="btn btn-outline-primary" onclick="viewJobDetails('${request.id}')">
                            <i class="bi bi-eye"></i>
                        </button>
                        <button class="btn btn-outline-secondary" onclick="editJob('${request.id}')">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-outline-danger" onclick="deleteJob('${request.id}')">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Populate upload history
    function populateUploadHistory() {
        const tableBody = document.getElementById('uploadHistoryTable');
        if (!tableBody) return;
        
        tableBody.innerHTML = '';
        
        uploadHistoryData.forEach(upload => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <i class="bi bi-file-earmark-text me-2"></i>
                    ${upload.fileName}
                </td>
                <td>
                    <span class="badge bg-secondary">${upload.type}</span>
                </td>
                <td>${upload.size}</td>
                <td>${new Date(upload.uploadDate).toLocaleDateString()}</td>
                <td>
                    <span class="badge bg-${upload.status === 'Processed' ? 'success' : 'warning'}">
                        ${upload.status}
                    </span>
                </td>
                <td>
                    <div class="btn-group btn-group-sm">
                        <button class="btn btn-outline-primary">
                            <i class="bi bi-download"></i>
                        </button>
                        <button class="btn btn-outline-danger">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Populate activity feed
    function populateActivityFeed() {
        const activityFeed = document.getElementById('activityFeed');
        if (!activityFeed) return;
        
        const activities = [
            {
                type: 'success',
                icon: 'bi-check-circle',
                title: 'Job Request Completed',
                description: 'JD001 - Senior Full Stack Developer matching completed with 3 candidates found',
                time: '2 hours ago'
            },
            {
                type: 'info',
                icon: 'bi-upload',
                title: 'New Profiles Uploaded',
                description: '25 new consultant profiles added to the database',
                time: '4 hours ago'
            },
            {
                type: 'warning',
                icon: 'bi-exclamation-triangle',
                title: 'AI Processing Delay',
                description: 'High queue volume detected, processing time increased by 15%',
                time: '6 hours ago'
            },
            {
                type: 'success',
                icon: 'bi-graph-up',
                title: 'System Performance',
                description: 'AI matching accuracy improved to 94.2% this month',
                time: '1 day ago'
            }
        ];
        
        activityFeed.innerHTML = activities.map(activity => `
            <div class="activity-item d-flex">
                <div class="activity-icon me-3">
                    <div class="bg-${activity.type === 'success' ? 'success' : activity.type === 'warning' ? 'warning' : 'info'} 
                              text-white rounded-circle d-flex align-items-center justify-content-center" 
                         style="width: 2.5rem; height: 2.5rem;">
                        <i class="${activity.icon}"></i>
                    </div>
                </div>
                <div class="activity-content flex-grow-1">
                    <h6 class="mb-1">${activity.title}</h6>
                    <p class="text-muted mb-1">${activity.description}</p>
                    <small class="text-muted">${activity.time}</small>
                </div>
            </div>
        `).join('');
    }

    // Initialize charts
    function initializeCharts() {
        // Matching Trends Chart
        const trendsCtx = document.getElementById('matchingTrendsChart');
        if (trendsCtx) {
            new Chart(trendsCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Successful Matches',
                        data: [65, 78, 85, 92, 89, 94],
                        borderColor: '#2563eb',
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100
                        }
                    }
                }
            });
        }

        // Department Distribution Chart
        const deptCtx = document.getElementById('departmentChart');
        if (deptCtx) {
            new Chart(deptCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Engineering', 'Data Science', 'DevOps', 'Product'],
                    datasets: [{
                        data: [45, 25, 20, 10],
                        backgroundColor: [
                            '#2563eb',
                            '#10b981',
                            '#f59e0b',
                            '#06b6d4'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }
    }

    // Initialize analytics charts
    function initializeAnalyticsCharts() {
        // Success Rate Chart
        const successCtx = document.getElementById('successRateChart');
        if (successCtx) {
            new Chart(successCtx, {
                type: 'bar',
                data: {
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                    datasets: [{
                        label: 'Success Rate %',
                        data: [91.5, 93.2, 94.1, 94.2],
                        backgroundColor: '#10b981',
                        borderRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: false,
                            min: 90,
                            max: 100
                        }
                    }
                }
            });
        }

        // Skills Chart
        const skillsCtx = document.getElementById('skillsChart');
        if (skillsCtx) {
            new Chart(skillsCtx, {
                type: 'horizontalBar',
                data: {
                    labels: ['React', 'Python', 'AWS', 'Node.js', 'Docker'],
                    datasets: [{
                        label: 'Demand',
                        data: [85, 78, 72, 68, 55],
                        backgroundColor: '#2563eb'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: 'y'
                }
            });
        }
    }

    // Utility functions
    function getStatusColor(status) {
        switch(status) {
            case 'Completed': return 'success';
            case 'In Progress': return 'warning';
            case 'Pending': return 'secondary';
            default: return 'secondary';
        }
    }

    // Action functions
    window.viewJobDetails = function(jobId) {
        alert(`Viewing details for ${jobId}`);
    };

    window.editJob = function(jobId) {
        alert(`Editing ${jobId}`);
    };

    window.deleteJob = function(jobId) {
        if (confirm(`Are you sure you want to delete ${jobId}?`)) {
            alert(`${jobId} deleted successfully`);
        }
    };

    // File upload handlers
    document.getElementById('jdUpload')?.addEventListener('change', function(e) {
        handleFileUpload(e.target.files, 'Job Descriptions');
    });

    document.getElementById('profileUpload')?.addEventListener('change', function(e) {
        handleFileUpload(e.target.files, 'Profiles');
    });

    function handleFileUpload(files, type) {
        Array.from(files).forEach(file => {
            const newUpload = {
                fileName: file.name,
                type: type,
                size: formatFileSize(file.size),
                uploadDate: new Date().toISOString().split('T')[0],
                status: 'Processing'
            };
            
            uploadHistoryData.unshift(newUpload);
            
            // Simulate processing
            setTimeout(() => {
                newUpload.status = 'Processed';
                populateUploadHistory();
            }, 3000);
        });
        
        populateUploadHistory();
    }

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    // Initialize dashboard
    populateActivityFeed();
    initializeCharts();
});