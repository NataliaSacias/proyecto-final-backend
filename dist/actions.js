"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.login = exports.putCambiarPass = exports.cambioDePass = exports.verDetalleProducto = exports.deleteProducto = exports.getUsersDeatalles = exports.deleteUser = exports.listarProductos = exports.añadirProductos = exports.getUsers = exports.createUser = void 0;
var typeorm_1 = require("typeorm"); // getRepository"  traer una tabla de la base de datos asociada al objeto
var Usuario_1 = require("./entities/Usuario");
var utils_1 = require("./utils");
var Productos_1 = require("./entities/Productos");
var nodemailer_1 = __importDefault(require("nodemailer"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, newUser, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // important validations to avoid ambiguos errors, the client needs to understand what went wrong
                if (!req.body.nombre)
                    throw new utils_1.Exception("Please provide a nombre");
                if (!req.body.apellido)
                    throw new utils_1.Exception("Please provide a apellido");
                if (!req.body.email)
                    throw new utils_1.Exception("Please provide an email");
                if (!req.body.password)
                    throw new utils_1.Exception("Please provide a password");
                userRepo = typeorm_1.getRepository(Usuario_1.Usuario);
                return [4 /*yield*/, userRepo.findOne({ where: { email: req.body.email } })];
            case 1:
                user = _a.sent();
                if (user)
                    throw new utils_1.Exception("Users already exists with this email");
                newUser = typeorm_1.getRepository(Usuario_1.Usuario).create(req.body);
                return [4 /*yield*/, typeorm_1.getRepository(Usuario_1.Usuario).save(newUser)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createUser = createUser;
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Usuario_1.Usuario).find()];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.json(users)];
        }
    });
}); };
exports.getUsers = getUsers;
var añadirProductos = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productoRepo, producto, newProduct, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // important validations to avoid ambiguos errors, the client needs to understand what went wrong
                if (!req.body.stock)
                    throw new utils_1.Exception("Ingrese el stock");
                if (!req.body.precio)
                    throw new utils_1.Exception("Igrese el precio");
                if (!req.body.nombre)
                    throw new utils_1.Exception("Igrese el nombre");
                if (!req.body.descripcion)
                    throw new utils_1.Exception("Ingrese una descipción");
                if (!req.body.fotoDePortada)
                    throw new utils_1.Exception("Ingrese una imagen");
                productoRepo = typeorm_1.getRepository(Productos_1.Productos);
                return [4 /*yield*/, productoRepo.findOne({ where: { nombre: req.body.nombre } })];
            case 1:
                producto = _a.sent();
                if (producto)
                    throw new utils_1.Exception("Ya existe un producto con ese nombre");
                newProduct = typeorm_1.getRepository(Productos_1.Productos).create(req.body);
                return [4 /*yield*/, typeorm_1.getRepository(Productos_1.Productos).save(newProduct)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.añadirProductos = añadirProductos;
var listarProductos = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productos;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Productos_1.Productos).find()];
            case 1:
                productos = _a.sent();
                return [2 /*return*/, res.json(productos)];
        }
    });
}); };
exports.listarProductos = listarProductos;
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Usuario_1.Usuario)["delete"](req.params.id)];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.json(users)];
        }
    });
}); };
exports.deleteUser = deleteUser;
var getUsersDeatalles = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.user;
                return [4 /*yield*/, typeorm_1.getRepository(Usuario_1.Usuario).findOne({ where: { email: token.user.email } })];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.json(users)];
        }
    });
}); };
exports.getUsersDeatalles = getUsersDeatalles;
var deleteProducto = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deleteproducto;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Productos_1.Productos)["delete"](req.params.id)];
            case 1:
                deleteproducto = _a.sent();
                return [2 /*return*/, res.json(deleteproducto)];
        }
    });
}); };
exports.deleteProducto = deleteProducto;
var verDetalleProducto = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var verDetalle;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Productos_1.Productos).findOne(req.params.id)];
            case 1:
                verDetalle = _a.sent();
                return [2 /*return*/, res.json(verDetalle)];
        }
    });
}); };
exports.verDetalleProducto = verDetalleProducto;
var cambioDePass = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, user, token, tokenToSend_1, main;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                if (!email)
                    throw new utils_1.Exception("Please provide an email");
                return [4 /*yield*/, typeorm_1.getRepository(Usuario_1.Usuario).findOne({ where: { email: email } })];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("Si el correo ingresado es correco se enviara instricciones para cambiar la contraseña");
                else {
                    token = jsonwebtoken_1["default"].sign({ user: user }, process.env.JWT_KEY);
                    tokenToSend_1 = token.replace(/\./g, "$");
                    console.log(tokenToSend_1);
                    main = function () { return __awaiter(void 0, void 0, void 0, function () {
                        var testAccount, transporter, info;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, nodemailer_1["default"].createTestAccount()];
                                case 1:
                                    testAccount = _a.sent();
                                    testAccount.user = process.env.CORREO;
                                    testAccount.pass = process.env.PASSCORREO;
                                    transporter = nodemailer_1["default"].createTransport({
                                        host: "smtp.gmail.com",
                                        port: 465,
                                        secure: true,
                                        auth: {
                                            user: testAccount.user,
                                            pass: testAccount.pass
                                        }
                                    });
                                    return [4 /*yield*/, transporter.sendMail({
                                            from: '"Landa Productos Organicos 🍌🍊🥗🥕" <landaproductosorganicos@gmail.com>',
                                            to: user.email,
                                            subject: "Cambio de contraseña ✔",
                                            text: "¡Hola! " + user.nombre + " Solicitaste modificar tu contraseña en Landa.  Haciendo click en el siguiente link, te permitirá ingresar una nueva contraseña. " + process.env.FRONTEND_URL + "/cambiopass/" + tokenToSend_1,
                                            html: "¡Hola! " + user.nombre + " Solicitaste modificar tu contraseña en Landa.  Haciendo click en el siguiente link, te permitirá ingresar una nueva contraseña. " + process.env.FRONTEND_URL + "/cambiopass/" + tokenToSend_1
                                        })];
                                case 2:
                                    info = _a.sent();
                                    console.log("Message sent: %s", info.messageId);
                                    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                                    // Preview only available when sending through an Ethereal account
                                    console.log("Preview URL: %s", nodemailer_1["default"].getTestMessageUrl(info));
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    main()["catch"](console.error);
                    return [2 /*return*/, res.json("Si el correo ingresado es correco se enviara instricciones para cambiar la contraseña")];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.cambioDePass = cambioDePass;
var putCambiarPass = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.user;
                console.log(token);
                if (!req.body.pass)
                    throw new utils_1.Exception("Ingrese el pass en body");
                if (!req.body.confirmarpass)
                    throw new utils_1.Exception("Igrese el confirmarpass en body");
                if (req.body.pass !== req.body.confirmarpass)
                    throw new utils_1.Exception("Las pass no coinciden");
                return [4 /*yield*/, typeorm_1.getRepository(Usuario_1.Usuario).findOne({ email: token.user.email })];
            case 1:
                user = _a.sent();
                if (!user) return [3 /*break*/, 3];
                user.password = req.body.pass;
                return [4 /*yield*/, typeorm_1.getRepository(Usuario_1.Usuario).save(user)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/, res.json("Se cambio la pass")];
        }
    });
}); };
exports.putCambiarPass = putCambiarPass;
// ********************** TOKEN **********************
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.email)
                    throw new utils_1.Exception("Please specify an email on your request body", 400);
                if (!req.body.password)
                    throw new utils_1.Exception("Please specify a password on your request body", 400);
                return [4 /*yield*/, typeorm_1.getRepository(Usuario_1.Usuario)
                    // We need to validate that a user with this email and password exists in the DB
                ];
            case 1:
                userRepo = _a.sent();
                return [4 /*yield*/, userRepo.findOne({ where: { email: req.body.email, password: req.body.password } })];
            case 2:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("Invalid email or password", 401);
                token = jsonwebtoken_1["default"].sign({ user: user }, process.env.JWT_KEY);
                // return the user and the recently created token to the client
                return [2 /*return*/, res.json({ user: user, token: token })];
        }
    });
}); };
exports.login = login;
