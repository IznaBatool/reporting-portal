export interface DataSourceListPayload {
    page: number,
    perPage: number,
    search?: string;
}

export interface DataSourceListResponse {
    message: string,
    data: {
        dataSources: object[];
    };
}

export interface UpdateDescriptionPayload {
    id: number,
    description: string;
}

export interface UpdateDescriptionResponse {
    message: string,
}

export interface SetAutomationPayload {
    dataSourceId: number,
    isActive: number,
    automation: {
        id: number;
        time: string
    }[];
}

export interface SetAutomationResponse {
    message: string,
    data: string,
}


export interface FetchTransactionPayload {
    id: number,
    search: string;
}

export interface FetchTransactionResponse {
    message: string,
    data: object,
}

export interface FetchColumnsResponse {
    message: string,
    data: object
}

export interface FetchColumnsPayload {
    id: number
}

export interface FetchColumnDataResponse {
    message: string,
    data: object
}

export interface FetchColumnDataPayload {
    id: number,
    column: string,
    pagination: {
        page: number,
        perPage: number
    }
}
