// dashboard.component.ts (unchanged logic)
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { StatsService } from '../../Services/stats/stats.service';
import Chart from 'chart.js/auto';
import { CategoryScale, LinearScale, PointElement, LineElement, TimeScale, ScatterDataPoint } from 'chart.js';
import 'chartjs-adapter-date-fns';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, TimeScale);

interface ChartData {
  date: string; // YYYY-MM-DD format from backend
  amount: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  stats: any = {};
  incomes: ChartData[] = [];
  expenses: ChartData[] = [];
  incomeChart: Chart<'line', ScatterDataPoint[], string> | null = null;
  expenseChart: Chart<'line', ScatterDataPoint[], string> | null = null;

  @ViewChild('incomeLineChartRef') private incomeLineChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('expenseLineChartRef') private expenseLineChartRef!: ElementRef<HTMLCanvasElement>;

  constructor(private statsService: StatsService) {}

  ngOnInit(): void {
    this.getStats();
    this.getChartData();
  }

  ngAfterViewInit(): void {
    this.createLineCharts(); // Initial render with empty data
  }

  createLineCharts(): void {
    if (!this.incomeLineChartRef || !this.expenseLineChartRef) {
      return;
    }

    if (this.incomeChart) {
      this.incomeChart.destroy();
    }
    if (this.expenseChart) {
      this.expenseChart.destroy();
    }

    const incomeCtx = this.incomeLineChartRef.nativeElement.getContext('2d');
    if (incomeCtx) {
      this.incomeChart = new Chart<'line', ScatterDataPoint[], string>(incomeCtx, {
        type: 'line',
        data: {
          datasets: [{
            label: 'Income',
            data: this.incomes.map(income => ({
              x: new Date(income.date).getTime(),
              y: income.amount
            }) as ScatterDataPoint),
            borderWidth: 2,
            backgroundColor: 'rgba(80, 200, 120, 0.2)',
            borderColor: 'rgb(80, 200, 120)',
            tension: 0.4,
            fill: true,
            pointRadius: 3,
            pointBackgroundColor: 'rgb(80, 200, 120)',
            spanGaps: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'month',
                displayFormats: {
                  month: 'MMM yyyy'
                },
                tooltipFormat: 'yyyy-MM-dd'
              },
              title: {
                display: true,
                text: 'Date'
              },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 12
              }
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Amount (₹)'
              }
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'top'
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const date = new Date(context.parsed.x).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  });
                  const amount = context.parsed.y;
                  return `${context.dataset.label}: ₹${amount} on ${date}`;
                }
              }
            }
          }
        }
      });
    }

    const expenseCtx = this.expenseLineChartRef.nativeElement.getContext('2d');
    if (expenseCtx) {
      this.expenseChart = new Chart<'line', ScatterDataPoint[], string>(expenseCtx, {
        type: 'line',
        data: {
          datasets: [{
            label: 'Expense',
            data: this.expenses.map(expense => ({
              x: new Date(expense.date).getTime(),
              y: expense.amount
            }) as ScatterDataPoint),
            borderWidth: 2,
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
            borderColor: 'rgb(255, 0, 0)',
            tension: 0.4,
            fill: true,
            pointRadius: 3,
            pointBackgroundColor: 'rgb(255, 0, 0)',
            spanGaps: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'month',
                displayFormats: {
                  month: 'MMM yyyy'
                },
                tooltipFormat: 'yyyy-MM-dd'
              },
              title: {
                display: true,
                text: 'Date'
              },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 12
              }
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Amount (₹)'
              }
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'top'
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const date = new Date(context.parsed.x).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  });
                  const amount = context.parsed.y;
                  return `${context.dataset.label}: ₹${amount} on ${date}`;
                }
              }
            }
          }
        }
      });
    }
  }

  private getStats(): void {
    this.statsService.getStats().subscribe({
      next: (data) => {
        this.stats = data || {};
      },
      error: (error) => {
        console.error('Error fetching stats:', error);
      }
    });
  }

  private getChartData(): void {
    this.statsService.getChart().subscribe({
      next: (res) => {
        if (res?.expenseList && res?.incomeList) {
          this.incomes = res.incomeList
            .map((item: any) => ({
              date: item.date,
              amount: Number(item.amount)
            }))
            .sort((a: ChartData, b: ChartData) => 
              new Date(a.date).getTime() - new Date(b.date).getTime()
            );

          this.expenses = res.expenseList
            .map((item: any) => ({
              date: item.date,
              amount: Number(item.amount)
            }))
            .sort((a: ChartData, b: ChartData) => 
              new Date(a.date).getTime() - new Date(b.date).getTime()
            );

          setTimeout(() => {
            this.createLineCharts();
          }, 0);
        }
      },
      error: (error) => {
        console.error('Error fetching chart data:', error);
      }
    });
  }
}