import { map } from 'rxjs/operators';
import { Component } from '@angular/core';
import { ChartService } from 'src/app/services/chartData.service';

@Component({
  selector: 'app-org-chart',
  templateUrl: './org-chart.component.html',
  styleUrls: ['./org-chart.component.scss'],
})
export class OrgChartComponent {
  // data: any;
  loader = false;

  constructor(private chartData: ChartService) {}

  // resp = [
  //   {
  //     key: 'Sales',
  //     original_order_total_amount: 1118980996,
  //     children: [
  //       {
  //         key: 'MF',
  //         original_order_total_amount: 208939359,
  //         children: [
  //           {
  //             key: 'CallCenter',
  //             original_order_total_amount: 109396191,
  //             children: [],
  //             width: 4.8882059387539405,
  //           },
  //           {
  //             key: 'Web',
  //             original_order_total_amount: 99294525,
  //             children: [],
  //             width: 4.4368280317068045,
  //           },
  //           {
  //             key: '',
  //             original_order_total_amount: 172032,
  //             children: [],
  //             width: 0.007686993819151509,
  //           },
  //           {
  //             key: 'GCSTORE',
  //             original_order_total_amount: 76611,
  //             children: [],
  //             width: 0.003423248485624862,
  //           },
  //         ],
  //         width: 9.336144212765522,
  //       },
  //       {
  //         key: 'GC',
  //         original_order_total_amount: 910033981,
  //         children: [
  //           {
  //             key: 'CallCenter',
  //             original_order_total_amount: 200792009,
  //             children: [],
  //             width: 8.972092006824395,
  //           },
  //           {
  //             key: 'GCSTORE',
  //             original_order_total_amount: 360956860,
  //             children: [],
  //             width: 16.128819939315573,
  //           },
  //           {
  //             key: 'Web',
  //             original_order_total_amount: 348265929,
  //             children: [],
  //             width: 15.56174458033423,
  //           },
  //           {
  //             key: '',
  //             original_order_total_amount: 2653,
  //             children: [],
  //             width: 0.00011854535552809335,
  //           },
  //           {
  //             key: 'Telephone',
  //             original_order_total_amount: 16530,
  //             children: [],
  //             width: 0.0007386184420955081,
  //           },
  //         ],
  //         width: 40.66351369027183,
  //       },
  //       {
  //         key: 'M123',
  //         original_order_total_amount: 7656,
  //         children: [
  //           {
  //             key: 'Web',
  //             original_order_total_amount: 7656,
  //             children: [],
  //             width: 0.00034209696265476164,
  //           },
  //         ],
  //         width: 0.00034209696265476164,
  //       },
  //     ],
  //     width: 50,
  //   },
  // ];

  data: any;

  ngOnInit() {
    this.loader = true;
    this.chartData.getOrgChartData().subscribe({
      next: (resp: any) => {
        const totalAmounts: any = {};
        resp.forEach(({ key, original_order_total_amount, children }: any) => {
          if (!totalAmounts[key]) {
            totalAmounts[key] = original_order_total_amount;
          } else {
            totalAmounts[key] += original_order_total_amount;
          }
          children.forEach(({ original_order_total_amount }: any) => {
            if (!totalAmounts[key]) {
              totalAmounts[key] = original_order_total_amount;
            } else {
              totalAmounts[key] += original_order_total_amount;
            }
          });
        });

        // Recursively calculate the width for each node
        const calculateWidth = (node: any, ancestorTotal: any) => {
          const { key, original_order_total_amount, children } = node;
          const width = (original_order_total_amount / ancestorTotal) * 100;
          const updatedNode = {
            ...node,
            width,
          };
          if (children.length > 0) {
            const updatedChildren = children.map((child: any) =>
              calculateWidth(child, ancestorTotal)
            );
            updatedNode.children = updatedChildren;
          }
          return updatedNode;
        };

        // Update each node with its width
        const updatedData = resp.map((topLevelNode: any) => {
          const ancestorTotal = totalAmounts[topLevelNode.key];
          return calculateWidth(topLevelNode, ancestorTotal);
        });
        this.data = this.generateNode(updatedData);
        this.loader = false;
      },
      error: (error) => {},
    });
  }

  generateNode(children: any) {
    return children.map((node: any) => {
      return {
        label: node.key || 'Others',
        type: 'person',
        styleClass: 'chart_node',
        expanded: true,
        data: {
          title: node.key || 'Others',
          width: node.width,
          value:
            '$' +
              Intl.NumberFormat('en-US', {
                notation: 'compact',
                compactDisplay: 'short',
              }).format(node.original_order_total_amount) || 0,
          color: this.generateRandomColorHex(),
        },
        children:
          node.children?.length > 0 ? this.generateNode(node.children) : [],
      };
    });
  }

  getOriginalOrderTotalForRoot(data: any) {
    const total = data.reduce((acc: any, curr: any) => {
      return acc + curr.original_order_total_amount;
    }, 0);
    return total;
  }

  expandNode(event: any) {
    console.log(event);
  }

  generateRandomColorHex(): string {
    const hexChars = '0123456789abcdef';
    let hexColor = '#';
    for (let i = 0; i < 6; i++) {
      hexColor += hexChars[Math.floor(Math.random() * hexChars.length)];
    }
    return hexColor;
  }
}
