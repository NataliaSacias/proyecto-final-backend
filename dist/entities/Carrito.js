"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
exports.__esModule = true;
exports.Carrito = void 0;
var typeorm_1 = require("typeorm");
var Productos_1 = require("./Productos");
var Carrito = /** @class */ (function (_super) {
    __extends(Carrito, _super);
    function Carrito() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Carrito.prototype, "id");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Carrito.prototype, "precio");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Carrito.prototype, "total");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Carrito.prototype, "cantidad");
    __decorate([
        typeorm_1.OneToMany(function () { return Productos_1.Productos; }, function (productos) { return productos.id; }),
        __metadata("design:type", Array)
    ], Carrito.prototype, "productos");
    Carrito = __decorate([
        typeorm_1.Entity()
    ], Carrito);
    return Carrito;
}(typeorm_1.BaseEntity));
exports.Carrito = Carrito;
