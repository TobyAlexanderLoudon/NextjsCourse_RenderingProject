export function GET(request) {
    console.log(request);

    // return Response.json();
    return new Response('Hello World!');
}

export function POST(request) {
    console.log(request);

    return new Response('Hello World!');
}

export function PUT(request) {
    console.log(request);

    return new Response('Hello World!');
}

export function PATCH(request) {
    console.log(request);

    return new Response('Hello World!');
}
