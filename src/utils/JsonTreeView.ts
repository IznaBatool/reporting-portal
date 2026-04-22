interface NodeProp {
    children?: object[],
    flag?: string,
    id?: number,
    label?: string,
    dataType?: string
}

let id = 1;
const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?(\.\d{3})?(Z|[+-]\d{2}:\d{2})?$/;
const dateRegex = /\b\d{4}-\d{2}-\d{2}\b/;
const JsonToTreeview = {
    convertToTreeview(jsonData: object | object[], parentPath: string | null, withType: boolean) {
        const parentValues = Object.entries(jsonData);
        const nodes: object[] = [];
        if (withType) id++;

        parentValues.forEach((keys) => {
            const path = parentPath ? `${parentPath}.${keys[0]}` : keys[0];
            const node: NodeProp = {};
            if (typeof keys[1] == "object" && keys[1] != null) {
                node.children = this.convertToTreeview(keys[1], path, withType);
            }
            node.flag = path;
            node.id = id++;
            node.label = keys[0];
            nodes.push(node);
            if (withType) node.dataType = this.identifyDateTime(keys[1]);
        });
        return nodes;
    },
    identifyDateTime(str: string) {
        if (dateTimeRegex.test(str) || dateRegex.test(str)) {
            return "dateTime";
        } else {
            return this.handleTypes(str);
        }
    },
    handleTypes(str: string) {
        let type;

        switch (true) {
            case typeof str === "number" && str === Math.floor(str):
                type = "integer";
                break;
            case typeof str === "number" && str !== Math.floor(str):
                type = "double";
                break;
            case typeof str === "string" && str.length > 100:
                type = "longText";
                break;
            default:
                type = "string";
        }

        return type;
    }
};

export default JsonToTreeview;
