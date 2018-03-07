import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import axios from "axios";

import PapaParse from "papaparse";

import './psv.scss';

@Component({
    template: require('./psv.html')
})
export class PSVPage extends Vue {

	data : any = [];

	titles = [
		{
			prop: "Title ID",
			label: "ID"
		},
		{
			prop: "Region",
			label: "Region"
		},
		{
			prop: "Name",
			label: "Name"
		},
		{
			prop: "PKG direct link",
			label: "PKG"
		},
		{
			prop: "zRIF",
			label: "zRIF"
		}
	]

	dialogVisible = false;
	currentData = {
		default_sku: {
			display_price: "",
		},
		images: [
			{ url: "" }
		]
	};

	currentRow ;

	mounted() {
		const that = this;
		PapaParse.parse("https://docs.google.com/spreadsheets/d/1HfI8elhzJW9XP9_A6KLx6AZpwP9vvWTal6i7NVwVWzs/export?format=csv&id=1HfI8elhzJW9XP9_A6KLx6AZpwP9vvWTal6i7NVwVWzs&gid=1180017671", {
			header: true,
			download: true,
			complete: function(results) {
				that.data = results.data;
				that.currentRow = that.data[0]
			}
		})
	}



	click(row) {
		let region = (row["Region"] == "ASIA") ? "HK" : row["Region"];
		let language = (row["Region"] == "JP") ? "JA" : "EN";
		let url = `https://cors.now.sh/https://store.playstation.com/chihiro-api/viewfinder/${region}/${language}/19/${row["Content ID"]}`;

		this.currentRow = row;
		axios.get(url).then(_ => {
			this.currentData = _.data;
			this.dialogVisible = true;
		});
	}

	customFilters = [{
		vals: '',
		props: 'Region',
	}, {
		vals: ''
	},{
		vals: ''
	},{
		vals: '',
		props: 'zRIF',
		filterFunction(el, filter) {
			return el["zRIF"] != filter.vals;
		}
	},{
		vals: '',
		props: 'PKG direct link',
		filterFunction(el, filter) {
			return el["PKG direct link"] != filter.vals;
		}
	}]

	handleClick(command) {
		this.$message(`click drapdown button ${command}`)
	}

	above361 = false;

	@Watch("above361")
	onAbove361Change(val, oldVal) {
		if(val) {
			this.customFilters[1].vals = '3.61+';
		} else {
			this.customFilters[1].vals = '';
		}
	}

	onlyCompleted = false;

	@Watch("onlyCompleted")
	onOnlyCompletedChange(val, oldVal) {
		if(val) {
			this.customFilters[3].vals = 'MISSING';
			this.customFilters[4].vals = 'MISSING';
		} else {
			this.customFilters[3].vals = '';
			this.customFilters[4].vals = '';
		}
	}

}
