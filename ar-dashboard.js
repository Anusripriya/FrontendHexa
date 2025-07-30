// AR Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Sample data for job requests
    const jobRequests = [
        {
            id: 'JD001',
            position: 'Senior Full Stack Developer',
            department: 'Engineering',
            status: 'Completed',
            topMatches: 3,
            emailStatus: 'Sent',
            progress: 100,
            created: '2024-01-10',
            description: 'Looking for a senior full stack developer with React, Node.js, and AWS experience.',
            matches: [
                { name: 'John Smith', score: 94, skills: ['React', 'Node.js', 'AWS'], experience: '5 years' },
                { name: 'Sarah Johnson', score: 91, skills: ['React', 'Node.js', 'Docker'], experience: '6 years' },
                { name: 'Mike Chen', score: 88, skills: ['React', 'Express', 'MongoDB'], experience: '4 years' }
            ]
        },
        {
            id: 'JD002',
            position: 'Data Scientist',
            department: 'Data Science',
            status: 'In Progress',
            topMatches: 2,
            emailStatus: 'Pending',
            progress: 75,
            created: '2024-01-12',
            description: 'Seeking a data scientist with Python, ML, and statistical analysis expertise.',
            matches: [
                { name: 'Emma Wilson', score: 96, skills: ['Python', 'TensorFlow', 'Statistics'], experience: '7 years' },
                { name: 'David Rodriguez', score: 92, skills: ['Python', 'PyTorch', 'SQL'], experience: '5 years' }
            ]
        },
        {
            id: 'JD003',
            position: 'DevOps Engineer',
            department: 'DevOps',
            status: 'In Progress',
            topMatches: 1,
            emailStatus: 'Pending',
            progress: 60,
            created: '2024-01-14',
            description: 'DevOps engineer needed for CI/CD pipeline management and cloud infrastructure.',
            matches: [
                { name: 'Alex Thompson', score: 89, skills: ['Docker', 'Kubernetes', 'AWS'], experience: '4 years' }
            ]
        },
        {
            id: 'JD004',
            position: 'Product Manager',
            department: 'Product',
            status: 'Completed',
            topMatches: 3,
            emailStatus: 'Sent',
            progress: 100,
            created: '2024-01-08',
            description: 'Product manager role focusing on agile methodologies and user experience.',
            matches: [
                { name: 'Lisa Park', score: 93, skills: ['Agile', 'Scrum', 'Analytics'], experience: '8 years' },
                { name: 'Tom Bradley', score: 90, skills: ['Product Strategy', 'UX', 'Data Analysis'], experience: '6 years' },
                { name: 'Rachel Green', score: 87, skills: ['Roadmapping', 'Stakeholder Management'], experience: '5 years' }
            ]
        }
    ];

    // Populate the requests table
    function populateRequestsTable() {
        const tableBody = document.getElementById('requestsTable');
        tableBody.innerHTML = '';

        jobRequests.forEach(request => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>${request.id}</strong></td>
                <td>${request.position}</td>
                <td>
                    <span class="badge bg-${getStatusColor(request.status)}">${request.status}</span>
                </td>
                <td>
                    <span class="badge bg-info">${request.topMatches} found</span>
                </td>
                <td>
                    <span class="badge bg-${request.emailStatus === 'Sent' ? 'success' : 'warning'}">
                        <i class="bi bi-envelope${request.emailStatus === 'Sent' ? '-check' : ''} me-1"></i>
                        ${request.emailStatus}
                    </span>
                </td>
                <td>
                    <div class="progress" style="height: 8px;">
                        <div class="progress-bar bg-${getProgressColor(request.progress)}" 
                             role="progressbar" 
                             style="width: ${request.progress}%"
                             aria-valuenow="${request.progress}" 
                             aria-valuemin="0" 
                             aria-valuemax="100">
                        </div>
                    </div>
                    <small class="text-muted">${request.progress}% complete</small>
                </td>
                <td>
                    <button class="btn btn-sm btn-outline-primary" onclick="viewDetails('${request.id}')">
                        <i class="bi bi-eye me-1"></i>View
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Get status color for badges
    function getStatusColor(status) {
        switch(status) {
            case 'Completed': return 'success';
            case 'In Progress': return 'warning';
            case 'Pending': return 'secondary';
            default: return 'secondary';
        }
    }

    // Get progress color
    function getProgressColor(progress) {
        if (progress === 100) return 'success';
        if (progress >= 50) return 'warning';
        return 'info';
    }

    // View request details
    window.viewDetails = function(requestId) {
        const request = jobRequests.find(r => r.id === requestId);
        if (!request) return;

        const detailTitle = document.getElementById('detailTitle');
        const jobSummary = document.getElementById('jobSummary');
        const progressTimeline = document.getElementById('progressTimeline');
        const topMatches = document.getElementById('topMatches');
        const detailedView = document.getElementById('detailedView');

        detailTitle.textContent = `${request.id} - ${request.position}`;
        
        jobSummary.innerHTML = `
            <div class="card border-left-primary">
                <div class="card-body p-3">
                    <p class="mb-2"><strong>Department:</strong> ${request.department}</p>
                    <p class="mb-2"><strong>Created:</strong> ${new Date(request.created).toLocaleDateString()}</p>
                    <p class="mb-0"><strong>Description:</strong></p>
                    <p class="text-muted">${request.description}</p>
                </div>
            </div>
        `;

        // Create progress timeline
        const timelineSteps = [
            { title: 'JD Submitted', completed: true, date: request.created },
            { title: 'AI Analysis', completed: request.progress >= 25, date: request.progress >= 25 ? request.created : null },
            { title: 'Profile Matching', completed: request.progress >= 50, date: request.progress >= 50 ? request.created : null },
            { title: 'Ranking Complete', completed: request.progress >= 75, date: request.progress >= 75 ? request.created : null },
            { title: 'Email Sent', completed: request.progress === 100, date: request.progress === 100 ? request.created : null }
        ];

        progressTimeline.innerHTML = `
            <div class="timeline">
                ${timelineSteps.map(step => `
                    <div class="timeline-item ${step.completed ? 'completed' : ''}">
                        <div class="d-flex align-items-center">
                            <div class="timeline-marker ${step.completed ? 'bg-success' : 'bg-muted'}">
                                <i class="bi bi-${step.completed ? 'check' : 'clock'} text-white"></i>
                            </div>
                            <div class="ms-3">
                                <h6 class="mb-1">${step.title}</h6>
                                ${step.date ? `<small class="text-muted">${new Date(step.date).toLocaleDateString()}</small>` : ''}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        // Display top matches
        topMatches.innerHTML = request.matches.map((match, index) => `
            <div class="card mb-3 ${index === 0 ? 'border-success' : ''}">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <h6 class="mb-0">${match.name}</h6>
                        <span class="badge bg-${index === 0 ? 'success' : index === 1 ? 'warning' : 'info'} fs-6">
                            ${match.score}% match
                        </span>
                    </div>
                    <p class="text-muted mb-2">Experience: ${match.experience}</p>
                    <div class="d-flex flex-wrap gap-1">
                        ${match.skills.map(skill => `
                            <span class="badge bg-light text-dark">${skill}</span>
                        `).join('')}
                    </div>
                </div>
            </div>
        `).join('');

        detailedView.style.display = 'block';
        detailedView.scrollIntoView({ behavior: 'smooth' });
    };

    // Hide detailed view
    window.hideDetailedView = function() {
        document.getElementById('detailedView').style.display = 'none';
    };

    // Submit new request
    window.submitRequest = function() {
        const form = document.getElementById('newRequestForm');
        const formData = new FormData(form);
        
        // Create new request object
        const newRequest = {
            id: `JD${String(jobRequests.length + 1).padStart(3, '0')}`,
            position: formData.get('jobTitle'),
            department: formData.get('department'),
            status: 'Pending',
            topMatches: 0,
            emailStatus: 'Pending',
            progress: 0,
            created: new Date().toISOString().split('T')[0],
            description: formData.get('jobDescription'),
            matches: []
        };

        jobRequests.unshift(newRequest);
        populateRequestsTable();
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('newRequestModal'));
        modal.hide();
        
        // Reset form
        form.reset();
        
        // Show success message
        showAlert('New job request submitted successfully!', 'success');
        
        // Simulate processing
        setTimeout(() => {
            newRequest.status = 'In Progress';
            newRequest.progress = 25;
            populateRequestsTable();
        }, 2000);
    };

    // Show alert messages
    function showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.querySelector('.container').insertBefore(alertDiv, document.querySelector('.row'));
        
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }

    // Initialize dashboard
    populateRequestsTable();

    // Add some CSS for timeline
    const style = document.createElement('style');
    style.textContent = `
        .timeline {
            position: relative;
            padding-left: 2rem;
        }
        
        .timeline::before {
            content: '';
            position: absolute;
            left: 1rem;
            top: 0;
            bottom: 0;
            width: 2px;
            background: #e2e8f0;
        }
        
        .timeline-item {
            position: relative;
            margin-bottom: 1.5rem;
        }
        
        .timeline-marker {
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            left: -2rem;
            top: 0;
            border: 3px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .timeline-item.completed .timeline-marker {
            background: #10b981 !important;
        }
        
        .bg-muted {
            background: #6b7280 !important;
        }
    `;
    document.head.appendChild(style);
});