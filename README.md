# `use-modal-with-query`

A simple React hook to synchronize the modal state with URL query parameters. This hook helps to manage modals via query params and provides seamless history support without reloading the page. It is designed to work with React 18+ and Next.js.

## Features

- Synchronize modal state with query parameters
- Open and close modals using the `open` and `close` functions
- Supports history management with URL updates using shallow routing
- Clean and maintainable code structure
- Easily extendable for future use cases

## Installation

To install the package, use the following command:

```bash
npm install use-modal-with-query

or

pnpm install use-modal-with-query

```

## Usage

To use the `use-modal-with-query` hook, follow these steps:

1. **Install the package**: Make sure the package is installed in your project by running the following command:

   ```bash
   npm install use-modal-with-query
   ```

   or

   ```bash
   pnpm install use-modal-with-query
   ```

2. **Import the hook**: Import `useModalWithQuery` in the component where you want to use it.

   ```javascript
   import { useModalWithQuery } from "use-modal-with-query";
   ```

3. **Use the hook**: Call `useModalWithQuery()` inside your component. By default, it tracks the `create-workspace` query parameter. You can also pass a custom query parameter name.

   ```javascript
   const { isOpen, open, close } = useModalWithQuery("create-workspace");
   ```

4. **Control the modal**: Use the `open` and `close` functions to show or hide the modal, respectively. The `isOpen` state will automatically update based on the query parameter in the URL.

   ```javascript
   return (
     <div>
       <button onClick={open}>Open Modal</button>
       <button onClick={close}>Close Modal</button>

       {isOpen && (
         <div className="modal">
           <h2>Workspace Modal</h2>
           <p>This modal is synchronized with the URL query param.</p>
         </div>
       )}
     </div>
   );
   ```

### Parameters

- `queryParam` (optional): The name of the query parameter to track (default is `create-workspace`).

### Returned Values

- `isOpen`: Boolean indicating if the modal is open (based on the query parameter).
- `open`: Function to open the modal and set the query parameter to `true`.
- `close`: Function to close the modal and remove the query parameter.

## How it Works

The `use-modal-with-query` hook synchronizes the modal state with a query parameter in the URL. Here's how it works:

1. **Open the Modal**: When you call the `open` function, it updates the URL by adding the query parameter (default is `create-workspace=true`). This ensures that the modal's visibility is stored in the URL, making it possible to share links with the modal open.

2. **Close the Modal**: When you call the `close` function, it removes the query parameter from the URL, which effectively closes the modal.

3. **Shallow Routing**: The URL changes (adding or removing query parameters) are done using **shallow routing**. This means that the page does not reload when the modal state changes, ensuring a smooth user experience.

4. **Modal State Sync**: The `useEffect` hook listens for changes in the query parameter. When the query parameter value is set to `"true"`, the modal is opened. If the query parameter is removed or changed, the modal is closed.

5. **History Management**: Since the query parameter is reflected in the URL, the modal state is also persistent across page reloads. If the page is refreshed or if the URL is shared, the modal will automatically be in the correct state (open or closed) based on the query parameter.

By using this approach, you can easily maintain modal state across page refreshes and make URLs that reflect the modal's open/closed status.
