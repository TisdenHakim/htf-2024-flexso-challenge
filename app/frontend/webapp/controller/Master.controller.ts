import Controller from "sap/ui/core/mvc/Controller";
import formatter from "../model/formatter";
import UIComponent from "sap/ui/core/UIComponent";
import UI5Event from "sap/ui/base/Event";
import { LayoutType } from "sap/f/library";
import ColumnListItem from "sap/m/ColumnListItem";
import Sorter from "sap/ui/model/Sorter";
import ListBinding from "sap/ui/model/ListBinding";

/**
 * @namespace flexso.htf.frontend.frontend.controller
 */
export default class Master extends Controller {
  public formatter = formatter;

  /*eslint-disable @typescript-eslint/no-empty-function*/
  public onInit(): void {
    (this?.getOwnerComponent() as UIComponent)
      ?.getRouter()
      ?.getRoute("RouteMaster")
      ?.attachPatternMatched(this.onRouteMatched.bind(this));
  }

  private onRouteMatched(event: UI5Event) {
    const { GalaxyId } = event.getParameter("arguments" as never) as {
      GalaxyId: string;
      layout: string;
    };

    this.getView()?.bindElement(`/KnownGalaxies('${GalaxyId}')`);
  }

  public onItemPress(event: UI5Event): void {
    const item = event.getSource() as ColumnListItem;

    const context = item.getBindingContext(); 
    if (context) {
      const galaxyId = context.getProperty("ID")

      console.log("Clicked on item with id: " + galaxyId);

      (this.getOwnerComponent() as UIComponent)
        .getRouter()
        .navTo("Detail", { GalaxyId: galaxyId, layout: LayoutType.TwoColumnsBeginExpanded });
    }
  }

  public onSortChange(event: UI5Event): void {
    const oTable = this.byId("galaxytable");
    const sSelectedKey = (event.getSource() as any).getSelectedKey();
    const oSorter = new Sorter(sSelectedKey, false);

    (oTable?.getBinding("items") as ListBinding)?.sort(oSorter);
  }
}
