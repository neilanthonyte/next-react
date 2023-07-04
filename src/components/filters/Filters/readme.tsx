import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import ReactSelect from "react-select";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
import * as uuid from "uuid";

import { ISODate, unixTimestamp } from "next-shared/src/types/dateTypes";
import { currentUnixTimestamp } from "next-shared/src/helpers/currentUnixTimestamp";
import { EInputLayout } from "next-shared/src/types/layouts";

import { useDebug } from "../../../debug/DemoWrapper";
import {
  CalendarRangeInput,
  CalendarSingleInput,
  ISODateRange,
} from "../../inputs/CalendarInput";
import { InputDecoration } from "../../generic/InputDecoration";
import { shortHumanDateFormat } from "../../../helpers/momentFormats";
import { EFilterType, Filter } from "../Filter";
import { Resource } from "../../generic/Resource";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "../../structure/Table";
import { NoDataFallback } from "../../structure/NoDataFallback";
import { VStack } from "../../structure/VStack";
import { OptionsInput } from "../../inputs/OptionsInput";
import { Filters, IFiltersProps } from ".";
import { SingleOptionsInput } from "../../inputs/SingleOptionsInput";

// used in integration test
export const FILTERS_VALUE_DEMO = "Yellow";
export const FILTERS_APPLY_FILTERS_ACTION = "apply-filters-action";

enum EReadStatus {
  Read = "read",
  NotRead = "notread",
  Month = "month",
  Year = "year",
}

const readStatusMap: { [key: string]: string } = {
  [EReadStatus.Read]: "Read",
  [EReadStatus.NotRead]: "Not read",
  [EReadStatus.Month]: "Read longer than a month ago",
  [EReadStatus.Year]: "Read longer than a year ago",
};

const readStatusOptions = [
  {
    value: EReadStatus.Read,
    label: readStatusMap[EReadStatus.Read],
  },
  {
    value: EReadStatus.NotRead,
    label: readStatusMap[EReadStatus.NotRead],
  },
  {
    value: EReadStatus.Month,
    label: readStatusMap[EReadStatus.Month],
  },
  {
    value: EReadStatus.Year,
    label: readStatusMap[EReadStatus.Year],
  },
];

enum EStatus {
  New = "new",
  Saved = "saved",
  Downloaded = "downloaded",
  Pinned = "pinned",
}

const statusMap: { [key: string]: string } = {
  [EStatus.New]: "New",
  [EStatus.Downloaded]: "Downloaded",
  [EStatus.Pinned]: "Pinned",
  [EStatus.Saved]: "Saved",
};

const statusOptions = [
  { value: EStatus.New, label: statusMap[EStatus.New] },
  {
    value: EStatus.Downloaded,
    label: statusMap[EStatus.Downloaded],
  },
  { value: EStatus.Saved, label: statusMap[EStatus.Saved] },
  { value: EStatus.Pinned, label: statusMap[EStatus.Pinned] },
];

const formatRangeDate = (range: ISODateRange): string => {
  const label = "Created at: ";
  if (!range) return label + "Any time";
  const from = dayjs(range.from).format(shortHumanDateFormat);
  const to = range.to
    ? `- ${dayjs(range.to).format(shortHumanDateFormat)}`
    : "- today";

  return [label, from, to].join(" ");
};

enum EColorOptions {
  Red = "Red",
  Blue = "Blue",
  Green = "Green",
  Yellow = "Yellow",
}

interface IFilters {
  status: { label: string; value: string };
  readReceiptStatus: { label: string; value: string };
  createdAt: ISODateRange;
  downloadedAt: ISODate;
  colors?: EColorOptions[];
}

export const DemoStandard = () => {
  const { setOutput, setActions } = useDebug({
    test: {
      componentName: "Filters",
      scenario: "standard",
    },
  });

  const [filter, setFilter] = useState<string>();
  const [showApplyFilterBtn, setShowApplyFilterBtn] = useState<boolean>();

  const handleOnApplyFilters = useCallback(() => {
    setOutput(filter);
  }, [filter]);

  useEffect(() => {
    setActions([
      {
        label: "Show apply filters button",
        action: () => setShowApplyFilterBtn((s) => !s),
        test: FILTERS_APPLY_FILTERS_ACTION,
      },
    ]);
  }, []);

  useEffect(() => {
    if (showApplyFilterBtn) return;
    setOutput(filter);
  }, [filter, showApplyFilterBtn]);

  return (
    <Filters
      onApplyFilters={showApplyFilterBtn ? handleOnApplyFilters : undefined}
    >
      <Filter
        label={`Color: ${filter || "any"}`}
        type={EFilterType.Primary}
        value={filter}
        onChange={(newVal) => {
          setFilter(newVal);
        }}
        onClear={() => setFilter(undefined)}
        renderInput={(props) => (
          <div data-test="options-input">
            <SingleOptionsInput
              options={["Blue", "Green", FILTERS_VALUE_DEMO]}
              {...props}
            />
          </div>
        )}
      />
    </Filters>
  );
};

export const DemoSecondary = () => {
  const { setOutput, setActions } = useDebug({
    test: {
      componentName: "Filters",
      scenario: "secondary",
    },
  });

  const [filters, setFilters] = useState<{ color?: string; day?: ISODate }>();
  const [showApplyFilterBtn, setShowApplyFilterBtn] = useState<boolean>();

  const handleOnApplyFilters = useCallback(() => {
    setOutput(filters);
  }, [filters]);

  useEffect(() => {
    setActions([
      {
        label: "Show apply filters button",
        action: () => setShowApplyFilterBtn((s) => !s),
      },
    ]);
  }, []);

  return (
    <Filters
      onApplyFilters={showApplyFilterBtn ? handleOnApplyFilters : undefined}
    >
      <Filter
        label={`Day: ${
          filters?.day
            ? dayjs(filters?.day).format(shortHumanDateFormat)
            : "Any"
        }`}
        type={EFilterType.Primary}
        value={filters?.day}
        onChange={(newVal) => setFilters({ day: newVal })}
        onClear={() => setFilters({ day: undefined })}
        renderInput={(props) => (
          <InputDecoration label="Downloaded">
            <CalendarSingleInput layout={EInputLayout.Inline} {...props} />
          </InputDecoration>
        )}
      />

      <Filter
        label={`Color: ${filters?.color ?? "Any"}`}
        type={EFilterType.Secondary}
        value={filters?.color}
        onChange={(newVal) => setFilters({ color: newVal })}
        onClear={() => setFilters({ color: undefined })}
        renderInput={(props) => (
          <InputDecoration label="Color">
            <div data-test="options-input">
              <SingleOptionsInput
                options={Object.values(EColorOptions)}
                placeholder="Select color"
                {...props}
              />
            </div>
          </InputDecoration>
        )}
        closePopoverOnChange={false}
      />
    </Filters>
  );
};

interface IExampleFiltersProps extends IFiltersProps {
  filters: IFilters;
  onChange: (newVal: Partial<IFilters>) => void;
}

const ExampleFilters: React.FC<IExampleFiltersProps> = ({
  filters,
  onChange,
  onApplyFilters,
}) => {
  return (
    <Filters onApplyFilters={onApplyFilters}>
      <Filter
        label={`Status: ${filters?.status?.label ?? "Any"}`}
        type={EFilterType.Primary}
        value={filters?.status}
        onChange={(newVal) => onChange({ status: newVal })}
        onClear={() => onChange({ status: undefined })}
        renderInput={(props) => (
          <InputDecoration label="Status">
            <Select
              options={statusOptions}
              placeholder="Select status"
              {...props}
            />
          </InputDecoration>
        )}
      />
      <Filter
        label={formatRangeDate(filters?.createdAt)}
        type={EFilterType.Primary}
        value={filters?.createdAt}
        onChange={(newVal) => onChange({ createdAt: newVal })}
        onClear={() => onChange({ createdAt: undefined })}
        renderInput={(props) => (
          <InputDecoration label="Created at range">
            <CalendarRangeInput layout={EInputLayout.Inline} {...props} />
          </InputDecoration>
        )}
        closePopoverOnChange={(val) => !!val?.from && !!val?.to}
      />
      <Filter
        label={`Day: ${
          filters?.downloadedAt
            ? dayjs(filters?.downloadedAt).format(shortHumanDateFormat)
            : "Any"
        }`}
        type={EFilterType.Secondary}
        value={filters?.downloadedAt}
        onChange={(newVal) => onChange({ downloadedAt: newVal })}
        onClear={() => onChange({ downloadedAt: undefined })}
        renderInput={(props) => (
          <InputDecoration label="Downloaded">
            <CalendarSingleInput layout={EInputLayout.Inline} {...props} />
          </InputDecoration>
        )}
      />
      <Filter
        label={`Read status: ${filters?.readReceiptStatus?.label ?? "Any"}`}
        type={EFilterType.Secondary}
        value={filters?.readReceiptStatus}
        onChange={(newVal) => onChange({ readReceiptStatus: newVal })}
        onClear={() => onChange({ readReceiptStatus: undefined })}
        renderInput={(props) => (
          <InputDecoration label="Read status" isRequired>
            <Select
              options={readStatusOptions}
              placeholder="Select read status"
              {...props}
            />
          </InputDecoration>
        )}
      />
      <Filter
        label={`Color: ${filters?.colors?.join(", ") ?? "Any"}`}
        type={EFilterType.Secondary}
        value={filters?.colors}
        onChange={(newVal) => onChange({ colors: newVal })}
        onClear={() => onChange({ colors: undefined })}
        renderInput={(props) => (
          <InputDecoration label="Color">
            <OptionsInput
              variant="grid"
              allowMultiple={true}
              options={Object.values(EColorOptions)}
              placeholder="Select color"
              {...props}
            />
          </InputDecoration>
        )}
        closePopoverOnChange={false}
      />
    </Filters>
  );
};

export const DemoFull = () => {
  const { setOutput, setActions } = useDebug({
    test: {
      componentName: "Filters",
      scenario: "standard",
    },
  });

  const [filters, setFilters] = useState<IFilters>();
  const [showApplyFilterBtn, setShowApplyFilterBtn] = useState<boolean>();
  const [data, setData] = useState<IMockData[]>(mockData);

  const filterData = useCallback(() => {
    if (!filters) return;
    let filtered = mockData;
    if (filters.status) {
      filtered = filtered.filter((d) => d.status === filters.status.value);
    }
    if (filters.readReceiptStatus) {
      filtered = filtered.filter(
        (d) => d.read === filters.readReceiptStatus.value,
      );
    }
    if (filters.downloadedAt) {
      filtered = filtered.filter((d) =>
        dayjs.unix(d.downloadedAt).isSame(dayjs(filters.downloadedAt), "date"),
      );
    }
    if (filters.createdAt?.from) {
      filtered = filtered.filter((d) =>
        dayjs
          .unix(d.createdAt)
          .isSameOrAfter(dayjs(filters.createdAt.from), "date"),
      );
    }
    if (filters.createdAt?.to) {
      filtered = filtered.filter((d) =>
        dayjs
          .unix(d.createdAt)
          .isSameOrBefore(dayjs(filters.createdAt.to), "date"),
      );
    }
    if (filters.colors) {
      filtered = filtered.filter((d) => filters.colors.includes(d.color));
    }
    setData(filtered);
  }, [filters]);

  const handleOnApplyFilters = useCallback(() => {
    setOutput(filters);
    filterData();
  }, [filters, filterData]);

  useEffect(() => {
    setActions([
      {
        label: "Show apply filters button",
        action: () => setShowApplyFilterBtn((s) => !s),
      },
    ]);
  }, []);

  useEffect(() => {
    if (!showApplyFilterBtn) {
      filterData();
    }
  }, [showApplyFilterBtn, filterData]);

  return (
    <Resource>
      <VStack>
        <ExampleFilters
          onApplyFilters={showApplyFilterBtn ? handleOnApplyFilters : undefined}
          filters={filters}
          onChange={(newVal) => setFilters((s) => ({ ...s, ...newVal }))}
        />
        <Data data={data} />
      </VStack>
    </Resource>
  );
};

/** TODO create standalone component and reconcile with select from next-ehr */
interface ISelectProps {
  value: Record<string, unknown> | unknown;
  onInputChange: (newVal: Record<string, unknown>) => void;
  options: Record<string, unknown>[];
  startsOpen?: boolean;
  placeholder?: string;
}

const Select: React.FC<ISelectProps> = ({
  value,
  onInputChange,
  options,
  placeholder,
  startsOpen = false,
}) => {
  return (
    <ReactSelect
      options={options}
      onChange={onInputChange}
      value={value}
      isSearchable={false}
      defaultMenuIsOpen={startsOpen}
      placeholder={placeholder}
      styles={{
        control: (provided) => ({ ...provided, height: "40px" }),
        placeholder: (provided) => ({
          ...provided,
          width: "100%",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }),
      }}
    />
  );
};

interface IMockData {
  itemId: string;
  read: EReadStatus;
  status: EStatus;
  createdAt: unixTimestamp;
  downloadedAt?: unixTimestamp;
  color?: EColorOptions;
}

const mockData: IMockData[] = [
  {
    itemId: uuid.v4(),
    read: EReadStatus.Read,
    status: EStatus.Downloaded,
    createdAt: currentUnixTimestamp(),
    downloadedAt: currentUnixTimestamp(),
    color: EColorOptions.Red,
  },
  {
    itemId: uuid.v4(),
    read: EReadStatus.NotRead,
    status: EStatus.New,
    createdAt: currentUnixTimestamp() - Math.random() * 2000000,
    color: EColorOptions.Green,
  },
  {
    itemId: uuid.v4(),
    read: EReadStatus.NotRead,
    status: EStatus.Downloaded,
    createdAt: currentUnixTimestamp() - Math.random() * 2000000,
    downloadedAt: currentUnixTimestamp() - Math.random() * 2000000,
  },
  {
    itemId: uuid.v4(),
    read: EReadStatus.Year,
    status: EStatus.Pinned,
    createdAt: currentUnixTimestamp() - Math.random() * 2000000,
    color: EColorOptions.Yellow,
  },
];

const Data = ({ data }: { data: IMockData[] }) => {
  if (Array.isArray(data) && data.length === 0) {
    return <NoDataFallback />;
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Item id</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell>Read status</TableHeaderCell>
          <TableHeaderCell>Created</TableHeaderCell>
          <TableHeaderCell>Downloaded</TableHeaderCell>
          <TableHeaderCell>Color</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(data || []).map((d) => (
          <TableRow key={d.itemId}>
            <TableCell>{d.itemId}</TableCell>
            <TableCell>{statusMap[d.status]}</TableCell>
            <TableCell>{readStatusMap[d.read]}</TableCell>
            <TableCell>
              {dayjs.unix(d.createdAt).format(shortHumanDateFormat)}
            </TableCell>
            <TableCell>
              {d.downloadedAt
                ? dayjs.unix(d.downloadedAt).format(shortHumanDateFormat)
                : ""}
            </TableCell>
            <TableCell>{d.color}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
