/**
 * Created by vjcspy on 2/1/16.
 */
angular.module('iz.tree', [])
    .service('izTree', ['$document', '$q', '$timeout', function ($document, $q, $timeout) {
        this.convertToTreeData = function (interfaceData) {
            var apple_selected = function (branch) {
                return $scope.output = "APPLE! : " + branch.label;
            };
            var treedata_avm = [
                {
                    label: 'Animal',
                    children: [
                        {
                            label: 'Dog',
                            data: {
                                description: "man's best friend"
                            }
                        }, {
                            label: 'Cat',
                            data: {
                                description: "Felis catus"
                            }
                        }, {
                            label: 'Hippopotamus',
                            data: {
                                description: "hungry, hungry"
                            }
                        }
                    ]
                }, {
                    label: 'Vegetable',
                    data: {
                        definition: "A plant or part of a plant used as food, typically as accompaniment to meat or fish, such as a cabbage, potato, carrot, or bean.",
                        data_can_contain_anything: true
                    },
                    onSelect: function (branch) {
                        return $scope.output = "Vegetable: " + branch.data.definition;
                    },
                    children: [
                        {
                            label: 'Oranges'
                        }, {
                            label: 'Apples',
                            children: [
                                {
                                    label: 'Granny Smith',
                                    onSelect: apple_selected
                                }, {
                                    label: 'Red Delicous',
                                    onSelect: apple_selected
                                }, {
                                    label: 'Fuji',
                                    onSelect: apple_selected
                                }
                            ]
                        }
                    ]
                }
            ];
            var treeData = [];
            $.each(interfaceData, function (section, sectionDatav) {
                var currentSection = {};
                var childGroup = [];
                currentSection.label = section;
                $.each(sectionDatav, function (group, groupData) {
                    var currentGroup = {};
                    currentGroup.label = group;
                    currentGroup.data = groupData;
                    childGroup.push(currentGroup);
                });
                currentSection.children = childGroup;
                treeData.push(currentSection);
            });
            return treeData;
        }
    }
    ]);
