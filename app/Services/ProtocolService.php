<?php

namespace App\Services;

use App\Models\Protocol;
use Illuminate\Support\Facades\DB;

class ProtocolService
{
    public static function createProtocol(
        $productId,
        $marketId,
        $manufacturerId,
        $apiDetailId,
        $reference,
        $stpReferences,
        $packaging,
        $studyTypes,
        $tests,
        $containerNumber
    ) {
        //        DB::beginTransaction();
        //        try {
        $protocol = Protocol::create([
            'ProductID' => $productId,
            'MarketID' => $marketId,
            'ManufacturerID' => $manufacturerId,
            'ApiDetailID' => $apiDetailId,
            'Reference' => $reference,
            'ContainerCounts' => json_encode($containerNumber)
        ]);

        // saving stp references
        $variantIds = array_keys($stpReferences);

        foreach ($variantIds as $variantId) {
            $protocol->stpReferences()->create([
                'VariantID' => $variantId,
                'StpNo' => $stpReferences[$variantId]['stp'],
                'SpecificationNo' => $stpReferences[$variantId]['specification'],
            ]);
        }

        // saving packaging

        $variantIds = array_keys($packaging);

        foreach ($variantIds as $variantId) {
            $variantPackaging = $packaging[$variantId];
            $counts = array_keys($variantPackaging);

            foreach ($counts as $count) {
                $protocol->containers()->create([
                    'VariantID' => $variantId,
                    'Count' => $count,
                    'Primary' => $variantPackaging[$count]['primary'],
                    'Secondary' => $variantPackaging[$count]['secondary'],
                    'Tertiary' => $variantPackaging[$count]['tertiary']
                ]);
            }
        }

        // save study types

        foreach ($studyTypes as $studyType) {
            $protocol->studyTypes()->create([
                'StudyTypeID' => $studyType['studyTypeId'],
                'Months' => json_encode($studyType['months']),
                'ConditionID' => $studyType['conditionId']
            ]);
        }

        // save tests

        foreach ($tests as $test) {
            $testObj = $test['test'];
            $counts = $test['counts'];

            $protocolTest = $protocol->tests()->create([
                'TestID' => $testObj['TestID'],
                'SubTestID' => isset($test['SubTestID']) ? $test['SubTestID'] : null,
            ]);

            foreach ($counts as $variantId => $count) {
                $protocolTest->counts()->create([
                    'VariantID' => $variantId,
                    'Count' => $count
                ]);
            }
        }

        //            DB::commit();
        //
        //
        //        } catch (\Exception $e) {
        //            DB::rollBack();
        //            return false;
        //        }

        return $protocol;
    }
}
