export abstract class BaseParametersMapper<TData, TParameters, TPayload> {
  public abstract fromDataToParams(data: TData): TParameters;
  public abstract fromParamsToData(parameters: TParameters): TData;
  public abstract fromDataToPayload(parameters: TData): TPayload;
}
