export interface RequestParamsTypes {
    type: string,
    key: string,
    value: string
}

export interface ImportDataPayload {
    method: string,
    apiUrl: string,
    url: string,
    basicUrl: string,
    queryParams: RequestParamsTypes[],
    headers: object,
}

export interface TableColumnsTypes {
    add_Column: boolean,
    columnName: string,
    mapKey: {
        id: number,
        flag: string,
        label: string,
        dataType: string,
        disabled: boolean
    },
    type: string,
    isNullable: boolean,
    partition_Column: boolean,
    amount_Column: boolean
}

export interface TableDataTypes {
    dataSource: string,
    tableName: string,
    partitionColumn: string,
    amountColumn: string,
    columns?: TableColumnsTypes[]
}


export interface DatabaseSetupPayload {
    dataKey: string,
    httpRequest: ImportDataPayload,
    tableData: TableDataTypes,
}

export interface DatabaseSetupResponse {
    message: string,
}

export interface ImportDataResponse {
    message: string,
    data: {
        record?: object[],
        dataKey: string
    }
}
