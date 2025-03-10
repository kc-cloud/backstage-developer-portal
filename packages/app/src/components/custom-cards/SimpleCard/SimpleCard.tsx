// Importing necessary components and hooks from Backstage and Material-UI libraries
import React from 'react';
import { Card, CardContent, Typography, Link, Chip } from '@material-ui/core';
import { useEntity } from '@backstage/plugin-catalog-react';

// SimpleCard functional component
export function SimpleCard() {
  // Hook to access the entity from the Backstage catalog
  const { entity } = useEntity();

  // Extracting name and description from the entity metadata
  const name = entity.metadata.name;
  const description = entity.metadata.description || 'No description provided';
  const owner = entity.spec.owner;
  const productOwner = entity.spec.productOwner;
  const po_url: string = eval("`../user/${productOwner}`");
  const excludedKeys = ["system", "owner", "lifecycle", "type"];

  const convertCamelCaseToWords = (str: string): string => {
    return str.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (s) => s.toUpperCase());
  };

  const convertToLink = (str: string): string => {
    return eval("`../user/${str}`");
  };

  // JSX for rendering the component
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Team</Typography>
        <table className="border-collapse border border-gray-400 w-full text-left">
          <tbody>
            {Object.entries(entity.spec).filter(([key]) => !excludedKeys.includes(key)).map(([key, value]) => (
              <tr key={key}>
                <td className="border border-gray-400 px-4 py-2 font-semibold">{convertCamelCaseToWords(key)}: </td>
                <td className="border border-gray-400 px-4 py-2"></td>
                <td className="border border-gray-400 px-4 py-2">{value}
                  <a href={convertToLink(value)} rel="noopener noreferrer" className="text-blue-500 underline">
                        {value}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

