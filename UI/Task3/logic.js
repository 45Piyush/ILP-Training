// Sample booking data (static as per requirements)
        const bookings = [
            { id: 'BK10001', userId: 'USER123', userName: 'John Doe', serviceId: 'SRV001', date: '2023-06-15', serviceType: 'AC Repair', vendor: 'CoolTech Services', status: 'completed' },
            { id: 'BK10002', userId: 'USER123', userName: 'John Doe', serviceId: 'SRV002', date: '2023-06-18', serviceType: 'TV Repair', vendor: 'Appliance Masters', status: 'completed' },
            { id: 'BK10003', userId: 'USER123', userName: 'John Doe', serviceId: 'SRV003', date: '2023-06-20', serviceType: 'Bathroom Cleaning', vendor: 'CleanPro', status: 'completed' },
            { id: 'BK10004', userId: 'USER123', userName: 'John Doe', serviceId: 'SRV004', date: '2023-06-22', serviceType: '2-Wheeler Repair', vendor: 'AutoCare', status: 'completed' },
            { id: 'BK10005', userId: 'USER123', userName: 'John Doe', serviceId: 'SRV005', date: '2023-06-25', serviceType: 'Furniture Pickup', vendor: 'QuickCourier', status: 'completed' },
            { id: 'BK10006', userId: 'USER123', userName: 'John Doe', serviceId: 'SRV006', date: '2023-06-28', serviceType: 'Full Home Cleaning', vendor: 'Sparkle Homes', status: 'inprogress' },
            { id: 'BK10007', userId: 'USER123', userName: 'John Doe', serviceId: 'SRV007', date: '2023-07-01', serviceType: '4-Wheeler Repair', vendor: 'QuickFix Garage', status: 'pending' },
            { id: 'BK10008', userId: 'USER123', userName: 'John Doe', serviceId: 'SRV008', date: '2023-07-05', serviceType: 'Electronics Pickup', vendor: 'SafeTransit', status: 'pending' }
        ];

        // DOM Elements
        const tableBody = document.getElementById('bookings-table-body');
        const pagination = document.getElementById('pagination');

        // Configuration
        const rowsPerPage = 5;
        let currentPage = 1;

        // Initialize the table
        function renderTable(page = 1) {
            currentPage = page;
            const start = (page - 1) * rowsPerPage;
            const end = start + rowsPerPage;
            const paginatedBookings = bookings.slice(start, end);

            tableBody.innerHTML = '';

            if (paginatedBookings.length === 0) {
                tableBody.innerHTML = '<tr><td colspan="8" class="no-bookings">No bookings found</td></tr>';
                return;
            }

            paginatedBookings.forEach(booking => {
                const row = document.createElement('tr');
                
                // Determine status class
                let statusClass = '';
                switch(booking.status) {
                    case 'completed': statusClass = 'status-completed'; break;
                    case 'pending': statusClass = 'status-pending'; break;
                    case 'cancelled': statusClass = 'status-cancelled'; break;
                    case 'inprogress': statusClass = 'status-inprogress'; break;
                }

                row.innerHTML = `
                    <td>${booking.id}</td>
                    <td>${booking.userName}</td>
                    <td>${booking.serviceId}</td>
                    <td>${booking.date}</td>
                    <td>${booking.serviceType}</td>
                    <td>${booking.vendor}</td>
                    <td><span class="status ${statusClass}">${booking.status}</span></td>
                    <td><button class="action-btn">View</button></td>
                `;
                
                tableBody.appendChild(row);
            });

            renderPagination();
        }

        // Render pagination links
        function renderPagination() {
            const totalPages = Math.ceil(bookings.length / rowsPerPage);
            pagination.innerHTML = '';

            if (totalPages <= 1) return;

            // Previous button
            if (currentPage > 1) {
                const prevLink = document.createElement('a');
                prevLink.href = '#';
                prevLink.innerHTML = '&laquo; Previous';
                prevLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    renderTable(currentPage - 1);
                });
                pagination.appendChild(prevLink);
            }

            // Page numbers
            for (let i = 1; i <= totalPages; i++) {
                const pageLink = document.createElement('a');
                pageLink.href = '#';
                pageLink.textContent = i;
                if (i === currentPage) {
                    pageLink.classList.add('active');
                }
                pageLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    renderTable(i);
                });
                pagination.appendChild(pageLink);
            }

            // Next button
            if (currentPage < totalPages) {
                const nextLink = document.createElement('a');
                nextLink.href = '#';
                nextLink.innerHTML = 'Next &raquo;';
                nextLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    renderTable(currentPage + 1);
                });
                pagination.appendChild(nextLink);
            }
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            renderTable();
            
            // Add click event to action buttons
            document.addEventListener('click', function(e) {
                if (e.target.classList.contains('action-btn')) {
                    const row = e.target.closest('tr');
                    const bookingId = row.cells[0].textContent;
                    alert(`View details for booking ${bookingId}\n\nIn a real application, this would show detailed view or open a modal.`);
                }
            });
        });