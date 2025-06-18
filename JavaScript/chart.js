document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('lineChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Durgapur', 'City Center', 'Aesby More', 'Benachity', 'Rail Station', 'Market Area'],
            datasets: [
                {
                    label: 'Top Recent Locations',
                    data: [18, 15, 9, 12, 7, 14], // Highest safety locations
                    backgroundColor: 'rgba(13, 109, 253, 0.42)', // Light blue
                    borderColor: 'rgba(13, 110, 253, 1)', // Blue
                    borderWidth: 5,
                    tension: 0,
                    pointBackgroundColor: 'rgba(13, 110, 253, 1)',
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    borderDash: [5, 5], // Solid line
                    fill: true
                },
                {
                    label: 'Average Locations',
                    data: [12, 10, 6, 8, 5, 9], // Medium safety locations
                    backgroundColor: 'rgba(255, 193, 7, 0.42)', // Light yellow
                    borderColor: 'rgba(255, 193, 7, 1)', // Yellow
                    borderWidth: 3,
                    tension: 0,
                    pointBackgroundColor: 'rgba(255, 193, 7, 1)',
                    pointRadius: 5,
                    borderDash: [5, 5], // Dashed line
                    fill: true
                },
                {
                    label: 'Red-zone Locations',
                    data: [3, 7, 15, 10, 18, 5], // Dangerous locations
                    backgroundColor: 'rgba(220, 53, 69, 0.42)', // Light red
                    borderColor: 'rgba(220, 53, 69, 1)', // Red
                    borderWidth: 3,
                    tension: 0, // More curve for dramatic drops
                    pointBackgroundColor: 'rgba(220, 53, 69, 1)',
                    pointRadius: 5,
                    pointHoverRadius: 9,
                    borderDash: [5,5], // Solid line
                    fill: true,
                    // Special styling for danger drops
                    segment: {
                        borderColor: ctx => ctx.p0.parsed.y > ctx.p1.parsed.y ? 'rgba(220, 53, 69, 1)' : 'rgba(180, 53, 69, 1)',
                        borderWidth: ctx => ctx.p0.parsed.y > ctx.p1.parsed.y ? 4 : 3
                    }
                }
            ]
        },
        options: {
            responsive: true,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            size: 12,
                            weight: 'bold'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgb(27, 27, 27)',
                    titleFont: {
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 12
                    },
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y + ' safety score';
                            }
                            return label;
                        }
                    }
                },
                annotation: {
                    annotations: {
                        dangerZone: {
                            type: 'box',
                            yMin: 0,
                            yMax: 5,
                            backgroundColor: 'rgba(66, 197, 0, 0.1)',
                            borderColor: 'rgba(220, 53, 69, 0.3)',
                            borderWidth: 1
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Safe Steps Location Report',
                        font: {
                            weight: 'bold'
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Locations',
                        font: {
                            weight: 'bold'
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
});