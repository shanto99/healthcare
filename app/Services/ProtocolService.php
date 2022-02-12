<?php

namespace App\Services;

use App\Models\Protocol;
use App\Models\ProtocolApi;
use App\Models\TestSpecification;
use Illuminate\Support\Facades\DB;

class ProtocolService
{
    public static function createProtocol(
        $productId,
        $marketId,
        $manufacturerId,
        $apiDetailIds,
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
            $specifications = $test['specifications'];

            $protocolTest = $protocol->tests()->create([
                'TestID' => $testObj['TestID'],
                'SubTestID' => isset($testObj['SubTestID']) ? $testObj['SubTestID'] : null,
            ]);

            foreach ($specifications as $studyTypeId => $specification) {
                $studyType = $protocol->studyTypes()->where('StudyTypeID', $studyTypeId)->first();
                $protocolTest->specifications()->create([
                    'StudyID' => $studyType->StudyID,
                    'Specifications' => $specification
                ]);
            }

            foreach ($counts as $variantId => $count) {
                $protocolTest->counts()->create([
                    'VariantID' => $variantId,
                    'Count' => $count
                ]);
            }
        }

        //dd($apiDetailIds);

        foreach ($apiDetailIds as $apiDetailId) {
            ProtocolApi::create([
                'ProtocolID' => $protocol->ProtocolID,
                'ApiDetailID' => $apiDetailId
            ]);
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
