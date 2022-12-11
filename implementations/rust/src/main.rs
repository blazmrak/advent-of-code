extern crate core;

mod years;
mod files;

use years::solve_problem as solve;
use actix_web::{post, HttpResponse, Responder, HttpServer, App, web};
use serde::{Deserialize, Serialize};
use crate::years::SolveProblemError;

#[derive(Deserialize)]
struct ProblemBody {
    input: String,
}

#[derive(Serialize)]
struct ResultBody {
    result: String,
}

#[derive(Serialize)]
struct ErrorBody {
    message: String,
}

#[derive(Deserialize)]
struct ProblemPath {
    year: i16,
    day: i8,
    part: i8,
}

#[post("/years/{year}/days/{day}/parts/{part}")]
async fn solve_problem(path: web::Path<ProblemPath>, body: web::Json<ProblemBody>) -> impl Responder {
    match solve(path.year, path.day, path.part, body.input.clone()) {
        Ok(result) => {
            HttpResponse::Ok()
                .json(ResultBody { result })
        }
        Err(SolveProblemError::NotFound) => {
            HttpResponse::NotImplemented()
                .body("{\"message\":\"Not Implemented\"")
        }
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(solve_problem)
    })
        .bind(("localhost", 3000)).expect("To bind to localhost")
        .run()
        .await
}