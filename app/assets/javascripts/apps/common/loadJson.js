define(['jquery'], function () {
    var loadJson = function (data) {
        var tableheader = data[0];

        var xColumn = 0;

        var yColumns = [];

        for (var i = 1; i < tableheader.length; i++) {

            yColumns.push(i);

        }

        //line/area data

        var numjsondata = [];

        var jsondata = [];



        $.each(yColumns, function (i, item) {

            jsondata.push({name: tableheader[item], data: []});

            numjsondata.push({name: tableheader[item], data: []});

        })

        var jsonCate = [];

        var isXNum = "false";

        $.each(data, function (i, line) {

            if (i > 0) {

                if (i == 1) {

                    isXNum = !isNaN(line[xColumn]);

                }

                jsonCate.push(line[xColumn]);

            }

        });

        var pieJson = [];

        $.each(data, function (i, line) {

            if (i > 0) {

                pieJson.push([line[xColumn], parseFloat(line[yColumns[0]])]);

                $.each(jsondata, function (index, seriesData) {

                    seriesData.data.push(parseFloat(line[yColumns[index]]));


                })

                $.each(numjsondata, function (index, numSeriesData) {


                    numSeriesData.data.push({x: parseFloat(jsonCate[i - 1]), y: parseFloat(line[yColumns[index]])});


                })

            }

        });
        return {
            'pieJson':pieJson,
            'seriesData':jsondata,
            'numSeriesData':numjsondata,
            'cate':jsonCate
        }
    }
    return loadJson;
})