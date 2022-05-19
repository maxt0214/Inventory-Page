# Inventory-Page
 This is a simple client-server baed inventory tracking website using javascript, HTML, CSS along with React and express framework.
 
 I have taken a modular approach to ensure the extendablility of the application. The entire software is broken down into inventory, item, and warehouse modules. 
 
 Each module is divided into a layered structure(Manager-Service-Model). Manager manages each model and model controls logic and data. Service layer is dedicated to handle http request and response. 
 
 In this organized way, I could easily add more features and avoid any overhead when changing one module. I have also used Service Locator design pattern to decouple each module further, so correlation between two modules are centrolized(ex: ItemService should not interact with Inventory). 
 
 Overall, it is fairly easy to add more functionalities and maintain the application.
