<?php

namespace App\Http\Controllers;

use App\Models\Protocol;
use App\Services\ProtocolService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Psy\Util\Json;

class ProtocolController extends Controller
{
    public function create_protocol(Request $request): JsonResponse
    {
        $protocol = ProtocolService::createProtocol(
            $request->productId,
            $request->marketId,
            $request->manufacturerId,
            $request->apiDetailId,
            $request->reference,
            $request->stpReferences,
            $request->packaging,
            $request->studyTypes,
            $request->tests,
            $request->containerNumber
        );

        if (!$protocol) {
            return response()->json([
                'error' => 'Something went wrong'
            ], 400);
        }

        return response()->json([
            'protocol' => $protocol
        ], 200);
    }

    public function get_all_protocols(): JsonResponse
    {
        $protocols = Protocol::with('product', 'product.variants')->get();
        return response()->json([
            'protocols' => $protocols,
            'status' => 200
        ], 200);
    }

    public function get_protocol_detail($protocolId): JsonResponse
    {
        $protocol = Protocol::with(
            'product.variants',
            'tests.test',
            'tests.subTest',
            'tests.counts.variant',
            'studyTypes.condition',
            'studyTypes.studyType',
            'containers',
            'containers.primaryContainer.packagings',
            'containers.secondaryContainer.packagings',
            'containers.tertiaryContainer.packagings',
            'manufacturer',
            'market',
            'stpReferences',
            'api',
            'apis'
        )->find($protocolId);
        if (!$protocol) {
            return response()->json([
                'error' => 'No protocol found',
                'status' => Response::HTTP_NO_CONTENT
            ], Response::HTTP_NO_CONTENT);
        }

        return response()->json([
            'protocol' => $protocol,
            'status' => Response::HTTP_OK
        ], Response::HTTP_OK);
    }
}
