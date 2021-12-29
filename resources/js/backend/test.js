import axios from "axios";

const getParentTests = function()
{
    return new Promise(function(resolve, reject) {
        axios.get('/get_parent_tests').then(function(res) {
            resolve(res.data);
        }).catch(function(err) {
            if(reject) {
                reject(err);
            }
        });
    });
}

const getAllTests = function() {
    return new Promise(function(resolve, reject) {
        axios.get('/get_all_tests').then(function(res) {
            resolve(res.data);
        }).catch(function(err) {
            if(reject) {
                reject(err);
            }
        });
    });
}

const createTest = function(testName, expression, defaultValue, specifications, childTestName, childSpecifications, isMinMax, parentTest)
{
    testName = testName === "" ? null : testName;
    specifications = specifications === "" ? null : specifications;
    childTestName = childTestName === "" ? null : childTestName;
    childSpecifications = childSpecifications === "" ? null : childSpecifications;
    parentTest = parentTest === "" ? null : parentTest;
    expression = expression === "" ? null : expression;
    defaultValue = defaultValue === "" ? null : defaultValue;

    return new Promise(function(resolve, reject) {
        const payload = {
            TestName: testName,
            Specifications: specifications,
            ChildTestName: childTestName,
            ChildSpecifications: childSpecifications,
            IsMinMax: isMinMax,
            ParentTest: parentTest
        };

        console.log({expression, defaultValue});

        if(expression) payload['Expression'] = expression;
        if(defaultValue) payload['DefaultValue'] = defaultValue;

        axios.post('/save_test', payload).then(function (res) {
            resolve(res.data);
        }).catch(function(err) {
            if(reject) reject(err);
        })
    });
}

export {createTest, getParentTests, getAllTests};
