import { Injectable } from '@angular/core';
import { STYLE, THEME } from '../model/config';
import * as i0 from "@angular/core";
// eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match
export const DefaultConfig = {
    searchEnabled: false,
    headerEnabled: true,
    orderEnabled: true,
    orderEventOnly: false,
    paginationEnabled: true,
    clickEvent: true,
    selectRow: false,
    selectCol: false,
    selectCell: false,
    rows: 10,
    additionalActions: false,
    serverPagination: false,
    isLoading: false,
    detailsTemplate: false,
    groupRows: false,
    paginationRangeEnabled: true,
    collapseAllRows: false,
    checkboxes: false,
    radio: false,
    resizeColumn: false,
    fixedColumnWidth: true,
    horizontalScroll: false,
    logger: false,
    showDetailsArrow: false,
    showContextMenu: false,
    persistState: false,
    paginationMaxSize: 5,
    threeWaySort: false,
    onDragOver: false,
    tableLayout: {
        style: STYLE.NORMAL,
        theme: THEME.LIGHT,
        borderless: false,
        hover: true,
        striped: false,
    },
};
export class DefaultConfigService {
}
DefaultConfigService.config = DefaultConfig;
DefaultConfigService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: DefaultConfigService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
DefaultConfigService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: DefaultConfigService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: DefaultConfigService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtZWFzeS10YWJsZS9zcmMvbGliL3NlcnZpY2VzL2NvbmZpZy1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFVLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFFdkQsOEdBQThHO0FBQzlHLE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBVztJQUNuQyxhQUFhLEVBQUUsS0FBSztJQUNwQixhQUFhLEVBQUUsSUFBSTtJQUNuQixZQUFZLEVBQUUsSUFBSTtJQUNsQixjQUFjLEVBQUUsS0FBSztJQUNyQixpQkFBaUIsRUFBRSxJQUFJO0lBQ3ZCLFVBQVUsRUFBRSxJQUFJO0lBQ2hCLFNBQVMsRUFBRSxLQUFLO0lBQ2hCLFNBQVMsRUFBRSxLQUFLO0lBQ2hCLFVBQVUsRUFBRSxLQUFLO0lBQ2pCLElBQUksRUFBRSxFQUFFO0lBQ1IsaUJBQWlCLEVBQUUsS0FBSztJQUN4QixnQkFBZ0IsRUFBRSxLQUFLO0lBQ3ZCLFNBQVMsRUFBRSxLQUFLO0lBQ2hCLGVBQWUsRUFBRSxLQUFLO0lBQ3RCLFNBQVMsRUFBRSxLQUFLO0lBQ2hCLHNCQUFzQixFQUFFLElBQUk7SUFDNUIsZUFBZSxFQUFFLEtBQUs7SUFDdEIsVUFBVSxFQUFFLEtBQUs7SUFDakIsS0FBSyxFQUFFLEtBQUs7SUFDWixZQUFZLEVBQUUsS0FBSztJQUNuQixnQkFBZ0IsRUFBRSxJQUFJO0lBQ3RCLGdCQUFnQixFQUFFLEtBQUs7SUFDdkIsTUFBTSxFQUFFLEtBQUs7SUFDYixnQkFBZ0IsRUFBRSxLQUFLO0lBQ3ZCLGVBQWUsRUFBRSxLQUFLO0lBQ3RCLFlBQVksRUFBRSxLQUFLO0lBQ25CLGlCQUFpQixFQUFFLENBQUM7SUFDcEIsWUFBWSxFQUFFLEtBQUs7SUFDbkIsVUFBVSxFQUFFLEtBQUs7SUFDakIsV0FBVyxFQUFFO1FBQ1gsS0FBSyxFQUFFLEtBQUssQ0FBQyxNQUFNO1FBQ25CLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSztRQUNsQixVQUFVLEVBQUUsS0FBSztRQUNqQixLQUFLLEVBQUUsSUFBSTtRQUNYLE9BQU8sRUFBRSxLQUFLO0tBQ2Y7Q0FDRixDQUFDO0FBR0YsTUFBTSxPQUFPLG9CQUFvQjs7QUFDakIsMkJBQU0sR0FBVyxhQUFhLENBQUM7aUhBRGxDLG9CQUFvQjtxSEFBcEIsb0JBQW9COzJGQUFwQixvQkFBb0I7a0JBRGhDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb25maWcsIFNUWUxFLCBUSEVNRSB9IGZyb20gJy4uL21vZGVsL2NvbmZpZyc7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24sIG5vLXVuZGVyc2NvcmUtZGFuZ2xlLCBpZC1ibGFja2xpc3QsIGlkLW1hdGNoXG5leHBvcnQgY29uc3QgRGVmYXVsdENvbmZpZzogQ29uZmlnID0ge1xuICBzZWFyY2hFbmFibGVkOiBmYWxzZSxcbiAgaGVhZGVyRW5hYmxlZDogdHJ1ZSxcbiAgb3JkZXJFbmFibGVkOiB0cnVlLFxuICBvcmRlckV2ZW50T25seTogZmFsc2UsXG4gIHBhZ2luYXRpb25FbmFibGVkOiB0cnVlLFxuICBjbGlja0V2ZW50OiB0cnVlLFxuICBzZWxlY3RSb3c6IGZhbHNlLFxuICBzZWxlY3RDb2w6IGZhbHNlLFxuICBzZWxlY3RDZWxsOiBmYWxzZSxcbiAgcm93czogMTAsXG4gIGFkZGl0aW9uYWxBY3Rpb25zOiBmYWxzZSxcbiAgc2VydmVyUGFnaW5hdGlvbjogZmFsc2UsXG4gIGlzTG9hZGluZzogZmFsc2UsXG4gIGRldGFpbHNUZW1wbGF0ZTogZmFsc2UsXG4gIGdyb3VwUm93czogZmFsc2UsXG4gIHBhZ2luYXRpb25SYW5nZUVuYWJsZWQ6IHRydWUsXG4gIGNvbGxhcHNlQWxsUm93czogZmFsc2UsXG4gIGNoZWNrYm94ZXM6IGZhbHNlLFxuICByYWRpbzogZmFsc2UsXG4gIHJlc2l6ZUNvbHVtbjogZmFsc2UsXG4gIGZpeGVkQ29sdW1uV2lkdGg6IHRydWUsXG4gIGhvcml6b250YWxTY3JvbGw6IGZhbHNlLFxuICBsb2dnZXI6IGZhbHNlLFxuICBzaG93RGV0YWlsc0Fycm93OiBmYWxzZSxcbiAgc2hvd0NvbnRleHRNZW51OiBmYWxzZSxcbiAgcGVyc2lzdFN0YXRlOiBmYWxzZSxcbiAgcGFnaW5hdGlvbk1heFNpemU6IDUsXG4gIHRocmVlV2F5U29ydDogZmFsc2UsXG4gIG9uRHJhZ092ZXI6IGZhbHNlLFxuICB0YWJsZUxheW91dDoge1xuICAgIHN0eWxlOiBTVFlMRS5OT1JNQUwsXG4gICAgdGhlbWU6IFRIRU1FLkxJR0hULFxuICAgIGJvcmRlcmxlc3M6IGZhbHNlLFxuICAgIGhvdmVyOiB0cnVlLFxuICAgIHN0cmlwZWQ6IGZhbHNlLFxuICB9LFxufTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERlZmF1bHRDb25maWdTZXJ2aWNlIHtcbiAgcHVibGljIHN0YXRpYyBjb25maWc6IENvbmZpZyA9IERlZmF1bHRDb25maWc7XG59XG4iXX0=