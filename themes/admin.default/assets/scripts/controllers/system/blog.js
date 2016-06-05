/**
 * Created by vjcspy on 2/1/16.
 */
app.controller('BlogCtrl', ['$scope', '$timeout', 'izTree', function ($scope, $timeout, izTree) {
    $scope.my_tree_handler = function (branch) {
        if (typeof tree.get_parent_branch(branch) != 'undefined') {
            $scope.parentBranch = tree.get_parent_branch(branch).label;
        }
        //$scope.output = "Your parent branch selected: " + tree.get_parent_branch(branch).label;
        $scope.currentBranchData = branch;
    };
    $scope.output = "Blog Setting Page";
    $scope.interfaceConfig = $scope.blogConfigData.data['interface'];
    $scope.configData = $scope.blogConfigData.data['configData'];

    $scope.my_data = izTree.convertToTreeData($scope.interfaceConfig);

    $scope.my_tree = tree = {};

    $scope.try_async_load = function () {
        $scope.my_data = [];
        $scope.doing_async = true;
        return $timeout(function () {
            if (Math.random() < 0.5) {
                $scope.my_data = treedata_avm;
            } else {
                $scope.my_data = treedata_geography;
            }
            $scope.doing_async = false;
            return tree.expand_all();
        }, 1000);
    };
}]);
