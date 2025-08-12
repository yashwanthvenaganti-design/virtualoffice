import React from 'react';
import AvailabilityTable from '../components/availability/AvailabilityTable';

// Interface for our data (with string IDs)
interface AvailabilityRowData {
  id: string;
  name: string;
  availability: string;
  tel: string;
  email: string;
  sms: string;
}

// Interface for the original table component (with number IDs)
interface TableRowData {
  id: number;
  name: string;
  availability: string;
  tel: string;
  email: string;
  sms: string;
}

interface AvailabilityTableWrapperProps {
  rows: AvailabilityRowData[];
  selectedRows: string[];
  onSelectRow: (id: string) => void;
  onSelectAll: (checked: boolean) => void;
  selectAll: boolean;
  onRowClick?: (event: React.MouseEvent<HTMLDivElement>, id: string) => void;
}

const AvailabilityTableWrapper: React.FC<AvailabilityTableWrapperProps> = ({
  rows,
  selectedRows,
  onSelectRow,
  onSelectAll,
  selectAll,
  onRowClick,
}) => {
  // Create a mapping between string IDs and number indices
  const idMapping = React.useMemo(() => {
    const stringToNumber: Record<string, number> = {};
    const numberToString: Record<number, string> = {};

    rows.forEach((row, index) => {
      stringToNumber[row.id] = index;
      numberToString[index] = row.id;
    });

    return { stringToNumber, numberToString };
  }, [rows]);

  // Convert data to use number IDs for the table
  const tableRows: TableRowData[] = React.useMemo(() => {
    return rows.map((row, index) => ({
      ...row,
      id: index, // Use index as number ID
    }));
  }, [rows]);

  // Convert selected string IDs to number IDs
  const selectedNumberIds = React.useMemo(() => {
    return selectedRows
      .map(stringId => idMapping.stringToNumber[stringId])
      .filter(id => id !== undefined);
  }, [selectedRows, idMapping.stringToNumber]);

  // Handle row selection with conversion back to string
  const handleSelectRow = (numberId: number) => {
    const stringId = idMapping.numberToString[numberId];
    if (stringId) {
      onSelectRow(stringId);
    }
  };

  // Handle row click with conversion back to string
  const handleRowClick = (event: React.MouseEvent<HTMLDivElement>, numberId: number) => {
    const stringId = idMapping.numberToString[numberId];
    if (stringId && onRowClick) {
      onRowClick(event, stringId);
    }
  };

  return (
    <AvailabilityTable
      rows={tableRows}
      selectedRows={selectedNumberIds}
      onSelectRow={handleSelectRow}
      onSelectAll={onSelectAll}
      selectAll={selectAll}
      onRowClick={handleRowClick}
    />
  );
};

export default AvailabilityTableWrapper;
