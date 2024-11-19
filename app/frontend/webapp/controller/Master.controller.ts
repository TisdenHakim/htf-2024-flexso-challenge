import Controller from "sap/ui/core/mvc/Controller";
import formatter from "../model/formatter";
import UIComponent from "sap/ui/core/UIComponent";
import UI5Event from "sap/ui/base/Event";
import { LayoutType } from "sap/f/library";
import ListItemBase from "sap/m/ListItemBase";


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
    const item = event.getSource() as ListItemBase;

    // Get the binding context of the clicked item
    const context = item.getBindingContext();
    if (context) {
      const galaxyId = context.getProperty("GalaxyId");

    console.log("Clicked on item with id: " + galaxyId);

    (this.getOwnerComponent() as UIComponent)
      .getRouter()
      .navTo("Detail", { GalaxyId: galaxyId,  layout: LayoutType.TwoColumnsMidExpanded });
    }
  }
}
