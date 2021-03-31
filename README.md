# Demo Environment

### Overview
##### This is a demo environment that I created to support the sales process of our API. The API allows the Agency to utilize the functionality of IBQ's rating software without having to leave their UI. This environment is the UI to support the below API documentation:

##### https://documenter.getpostman.com/view/4446662/TzCFgAbe#6a56cfac-2d26-4643-8c44-14fccd8bd227

##### During demos we present this UI as an example of how the Agency can integrate with our API. There are certain customizations and different endpoints that we might add to the platform given the agency's Technical requirements. However, this is the base of functionality that we can build on. Having been given complete control over what this demo environment should look like, I opted for the simplicity of jQuery, HTML, and CSS. Given that each time we were giving a demo the code base needed changed and changed quickly I did not want to deal with creating a build, this is why I chose not to go with an SPA framework. Furthermore, since there is no sensitive data within this UI it is not necessary to obfuscate the code base. 

### Functionality

##### The UI makes three API calls in order to obtain rates, the first of which is to mock sending the Agency's collected JSON data from their UI to our API. We collect a sample file of all of the data they collect prior to the demo. Once we are in the demo, on the Get Rates button this will send the data to our API:

##### The initial Start Quote Post then returns all of the Class Codes that pertain to each of the Carriers supported by IBQ:

##### Once Class Codes are sent to the API it returns the Questions that are needed for each Carrier and Class Code:

##### After the Agent posts the Class Codes specific questions to the API they are returned with Rates for each Carrier:

##### Note: we are also utilizing an overlay spinner while we await the API requests:

