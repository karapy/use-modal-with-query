// This hook synchronizes the modal state with a query parameter in the URL.
// Use the open and close functions to control the modal's visibility.
// URL changes are done using shallow routing, meaning the page won't reload.

// Advantages: History support, clean code, and easy extensibility.

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const useModalWithQuery = (queryParam = "create-workspace") => {
  // Used to get the query parameters from the URL.
  const searchParams = useSearchParams();

  // The router is used to modify the URL.
  const router = useRouter();

  // State to track if the modal is open or closed.
  const [isOpen, setIsOpen] = useState(false);

  // Function to open the modal
  const open = useCallback(() => {
    setIsOpen(true);
    // Clone the current query parameters and add the modal query parameter.
    const currentParams = new URLSearchParams(searchParams?.toString());
    currentParams.set(queryParam, "true"); // Set the query parameter to 'true'.
    router.push(`?${currentParams.toString()}`, undefined, { shallow: true }); // Update the URL without reloading the page.
  }, [searchParams, queryParam, router]);

  // Function to close the modal
  const close = useCallback(() => {
    setIsOpen(false);
    // Remove the modal query parameter from the URL.
    const currentParams = new URLSearchParams(searchParams?.toString());
    currentParams.delete(queryParam); // Delete the query parameter.
    router.push(`?${currentParams.toString()}`, undefined, { shallow: true }); // Update the URL without reloading the page.
  }, [searchParams, queryParam, router]);

  // When the query parameter changes, update the modal state.
  useEffect(() => {
    const queryValue = searchParams?.get(queryParam); // Get the value of the query parameter.
    setIsOpen(queryValue === "true"); // If the query parameter is 'true', set the modal as open.
  }, [searchParams, queryParam]);

  // Return the state and functions to control the modal.
  return { isOpen, setIsOpen, open, close };
};

export default useModalWithQuery;
