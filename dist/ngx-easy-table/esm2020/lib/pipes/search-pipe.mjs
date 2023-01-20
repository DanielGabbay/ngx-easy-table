import { Pipe } from '@angular/core';
import { FiltersService } from '../services/filters.service';
import * as i0 from "@angular/core";
export class SearchPipe {
    constructor() {
        this.filters = {};
    }
    transform(array, filter, filteredCountSubject, config) {
        filteredCountSubject.next(0);
        if (typeof array === 'undefined') {
            return;
        }
        if (typeof filter === 'undefined') {
            filteredCountSubject.next(array.length);
            return array;
        }
        filter.forEach((f) => {
            this.filters[f.key] = f.value.toString().toLocaleLowerCase();
            if (Object.keys(f).length === 0 || f.value === '') {
                // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                delete this.filters[f.key];
            }
        });
        if (config && config.groupRows) {
            return array.map((arr) => this.filterGroup(arr, filteredCountSubject));
        }
        return this.filterGroup(array, filteredCountSubject);
    }
    filterGroup(array, filteredCountSubject) {
        const arr = array.filter((obj) => {
            return Object.keys(this.filters).every((c) => {
                const split = c.split('.');
                const val = FiltersService.getPath(split, obj);
                const element = typeof val === 'object' ? JSON.stringify(val) : val.toString().toLocaleLowerCase();
                const strings = this.filters[c].split(',');
                return strings.some((s) => element.indexOf(s.trim()) > -1);
            });
        });
        filteredCountSubject.next(arr.length);
        return arr;
    }
}
SearchPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: SearchPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
SearchPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "15.0.4", ngImport: i0, type: SearchPipe, name: "search" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: SearchPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'search',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtZWFzeS10YWJsZS9zcmMvbGliL3BpcGVzL3NlYXJjaC1waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7QUFPN0QsTUFBTSxPQUFPLFVBQVU7SUFIdkI7UUFJVSxZQUFPLEdBQThCLEVBQUUsQ0FBQztLQTJDakQ7SUF6Q0MsU0FBUyxDQUNQLEtBQVksRUFDWixNQUE2QyxFQUM3QyxvQkFBcUMsRUFDckMsTUFBZTtRQUVmLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixJQUFJLE9BQU8sS0FBSyxLQUFLLFdBQVcsRUFBRTtZQUNoQyxPQUFPO1NBQ1I7UUFDRCxJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBRTtZQUNqQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQzdELElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEtBQUssRUFBRSxFQUFFO2dCQUNqRCxnRUFBZ0U7Z0JBQ2hFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDNUI7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxTQUFTLEVBQUU7WUFDOUIsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7U0FDeEU7UUFDRCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLG9CQUFvQixDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVPLFdBQVcsQ0FBQyxLQUFZLEVBQUUsb0JBQXFDO1FBQ3JFLE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUMvQixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUMzQyxNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUMzQixNQUFNLEdBQUcsR0FBRyxjQUFjLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDL0MsTUFBTSxPQUFPLEdBQ1gsT0FBTyxHQUFHLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztnQkFDckYsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzNDLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdELENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RDLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQzs7dUdBM0NVLFVBQVU7cUdBQVYsVUFBVTsyRkFBVixVQUFVO2tCQUh0QixJQUFJO21CQUFDO29CQUNKLElBQUksRUFBRSxRQUFRO2lCQUNmIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmlsdGVyc1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9maWx0ZXJzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi4nO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdzZWFyY2gnLFxufSlcbmV4cG9ydCBjbGFzcyBTZWFyY2hQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHByaXZhdGUgZmlsdGVyczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9O1xuXG4gIHRyYW5zZm9ybShcbiAgICBhcnJheTogYW55W10sXG4gICAgZmlsdGVyOiBBcnJheTx7IHZhbHVlOiBzdHJpbmc7IGtleTogc3RyaW5nIH0+LFxuICAgIGZpbHRlcmVkQ291bnRTdWJqZWN0OiBTdWJqZWN0PG51bWJlcj4sXG4gICAgY29uZmlnPzogQ29uZmlnXG4gICk6IGFueSB7XG4gICAgZmlsdGVyZWRDb3VudFN1YmplY3QubmV4dCgwKTtcbiAgICBpZiAodHlwZW9mIGFycmF5ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGZpbHRlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGZpbHRlcmVkQ291bnRTdWJqZWN0Lm5leHQoYXJyYXkubGVuZ3RoKTtcbiAgICAgIHJldHVybiBhcnJheTtcbiAgICB9XG4gICAgZmlsdGVyLmZvckVhY2goKGYpID0+IHtcbiAgICAgIHRoaXMuZmlsdGVyc1tmLmtleV0gPSBmLnZhbHVlLnRvU3RyaW5nKCkudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICAgIGlmIChPYmplY3Qua2V5cyhmKS5sZW5ndGggPT09IDAgfHwgZi52YWx1ZSA9PT0gJycpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1keW5hbWljLWRlbGV0ZVxuICAgICAgICBkZWxldGUgdGhpcy5maWx0ZXJzW2Yua2V5XTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoY29uZmlnICYmIGNvbmZpZy5ncm91cFJvd3MpIHtcbiAgICAgIHJldHVybiBhcnJheS5tYXAoKGFycikgPT4gdGhpcy5maWx0ZXJHcm91cChhcnIsIGZpbHRlcmVkQ291bnRTdWJqZWN0KSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmZpbHRlckdyb3VwKGFycmF5LCBmaWx0ZXJlZENvdW50U3ViamVjdCk7XG4gIH1cblxuICBwcml2YXRlIGZpbHRlckdyb3VwKGFycmF5OiBhbnlbXSwgZmlsdGVyZWRDb3VudFN1YmplY3Q6IFN1YmplY3Q8bnVtYmVyPik6IGFueVtdIHtcbiAgICBjb25zdCBhcnIgPSBhcnJheS5maWx0ZXIoKG9iaikgPT4ge1xuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuZmlsdGVycykuZXZlcnkoKGMpID0+IHtcbiAgICAgICAgY29uc3Qgc3BsaXQgPSBjLnNwbGl0KCcuJyk7XG4gICAgICAgIGNvbnN0IHZhbCA9IEZpbHRlcnNTZXJ2aWNlLmdldFBhdGgoc3BsaXQsIG9iaik7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPVxuICAgICAgICAgIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnID8gSlNPTi5zdHJpbmdpZnkodmFsKSA6IHZhbC50b1N0cmluZygpLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IHN0cmluZ3MgPSB0aGlzLmZpbHRlcnNbY10uc3BsaXQoJywnKTtcbiAgICAgICAgcmV0dXJuIHN0cmluZ3Muc29tZSgocykgPT4gZWxlbWVudC5pbmRleE9mKHMudHJpbSgpKSA+IC0xKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGZpbHRlcmVkQ291bnRTdWJqZWN0Lm5leHQoYXJyLmxlbmd0aCk7XG4gICAgcmV0dXJuIGFycjtcbiAgfVxufVxuIl19